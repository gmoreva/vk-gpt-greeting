import { Injectable, Logger } from '@nestjs/common';
import { GptProviderInterface, GptRequestMessages } from '@modules/gpt/gpt.provider.interface';
import { GigachatConfig } from '@modules/gpt/gigachat/gigachat.config';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import * as crypto from 'crypto';
import { Buffer } from 'buffer';

type AccessTokenInfo = {
  access_token: string;
  expires_at: number;
};

type GptRequest = {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
};

type GptResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

@Injectable()
export class GigachatService implements GptProviderInterface {
  private readonly logger = new Logger(this.constructor.name);

  private accessToken: AccessTokenInfo;

  constructor(
    private readonly config: GigachatConfig,
    private readonly http: HttpService,
  ) {
  }

  public async runFullSync(text: string, preprend: GptRequestMessages = []): Promise<string> {
    let finalMessage = {
      role: 'user',
      content: text,
    };
    const messages = preprend;
    messages.push(finalMessage);
    const result = await this.runRequest<GptRequest, GptResponse>(
      `/api/v1/chat/completions`,
      {
        data: {
          model: 'GigaChat:latest',
          messages,
        },
      },
    );

    return result?.choices[0]?.message?.content;
  }

  isActive(): boolean {
    return !!(this.config.clientSecret && this.config.clientSecret);
  }

  public setAccessToken(accessToken: AccessTokenInfo): void {
    this.accessToken = accessToken;
  }

  public async auth(): Promise<AccessTokenInfo> {
    if (this.accessToken) {
      const current = new Date().getTime();
      if (current > this.accessToken.expires_at) {
        this.accessToken = undefined;
      } else {
        return this.accessToken;
      }
    }
    let authorization = `${Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`,
      'utf-8',
    ).toString('base64')}`;
    const result = await this.http.axiosRef
      .request<AccessTokenInfo>({
        url: `/api/v2/oauth`,
        method: 'POST',
        baseURL: 'https://ngw.devices.sberbank.ru:9443',
        headers: {
          Authorization: `Basic ${authorization}`,
          RqUID: crypto.randomUUID(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: `scope=${this.config.clientScope}`,
      })
      .then((e) => e.data);
    this.accessToken = result;

    return this.accessToken;
  }

  private async runRequest<Request, Response>(
    path: string,
    config: AxiosRequestConfig<Request>,
  ): Promise<Response> {
    await this.auth();
    this.logger.log(`Run request to gigachat: ${JSON.stringify(config)}`);
    const {data} = await this.http.axiosRef
      .request({
        method: 'POST',
        baseURL: 'https://gigachat.devices.sberbank.ru',
        url: path,
        ...config,
        headers: {
          Authorization: `Bearer ${this.accessToken.access_token}`,
          ...config.headers,
        },
      })
      .catch((e) => {
        throw e;
      });
    this.logger.log(`Response: ${JSON.stringify(data)}`);
    return data;
  }
}
