import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GigachatService } from '@modules/gpt/gigachat/gigachat.service';
import { GptProviderInterface } from '@modules/gpt/gpt.provider.interface';
import { MockProvider } from '@modules/gpt/mock.provider';

export enum GptProviders {
  Gigachat = 'GIGACHAT',
  Mock = 'MOCK',
}

@Injectable()
export class GptProviderSelector implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  private readonly providersMap: {
    [key: string]: GptProviderInterface;
  };

  constructor(gigachat: GigachatService, mock: MockProvider) {
    this.providersMap = {
      [GptProviders.Gigachat]: gigachat,
      [GptProviders.Mock]: mock,
    };
  }

  public getProvider(provider: GptProviders) {
    if (!this.providersMap[provider]) {
      throw new Error(`try to get unknown provider: ${provider}`);
    }

    return this.providersMap[provider];
  }

  onModuleInit(): any {
    const activeProviders = [];
    Object.keys(this.providersMap).forEach((providerKey) => {
      const provider = this.providersMap[providerKey];
      if (!provider.isActive()) {
        this.logger.warn(`GPT Provider ${providerKey} is not active`);
      } else {
        activeProviders.push(providerKey);
      }
    });
    this.logger.log(`Active GPT providers: ${JSON.stringify(activeProviders)}`);
  }
}
