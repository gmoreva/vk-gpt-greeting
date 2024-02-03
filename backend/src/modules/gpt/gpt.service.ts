import { Injectable, Logger } from '@nestjs/common';
import { GptProviders, GptProviderSelector, } from '@modules/gpt/gpt.provider.selector';
import { GptConfig } from '@modules/gpt/gpt.config';
import { GptRequestMessages } from '@modules/gpt/gpt.provider.interface';

@Injectable()
export class GptService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly selector: GptProviderSelector,
    private readonly config: GptConfig,
  ) {
  }

  public async runFullSync(
    request: string,
    preprend: GptRequestMessages = [],
    provider: GptProviders = this.config.defaultGptProvider,
  ) {
    this.logger.log(`Using provider ${provider} for request: ${request}`);
    return this.selector.getProvider(provider).runFullSync(request, preprend);
  }
}
