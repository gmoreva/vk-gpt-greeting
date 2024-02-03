import { BaseConfig } from '@common/config/baseConfig';
import { IsEnum, IsOptional } from 'class-validator';
import { GptProviders } from './gpt.provider.selector';

export class GptConfig extends BaseConfig {
  @IsOptional()
  @IsEnum(GptProviders)
  public readonly defaultGptProvider: GptProviders = process.env.DEFAULT_GPT_PROVIDER as GptProviders;
}
