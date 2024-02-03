import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseConfig } from '@common/config/baseConfig';

enum ScopeEnum {
  PERS = 'GIGACHAT_API_PERS',
  CORP = 'GIGACHAT_API_CORP',
}

export class GigachatConfig extends BaseConfig {
  @IsOptional()
  @IsString()
  public readonly clientId: string = process.env.GIGACHAT_CLIENT_ID;

  @IsOptional()
  @IsString()
  public readonly clientSecret: string = process.env.GIGACHAT_CLIENT_SECRET;

  @IsOptional()
  @IsEnum(ScopeEnum)
  public readonly clientScope: ScopeEnum = (process.env.GIGACHAT_SCOPE || ScopeEnum.PERS) as ScopeEnum;
}
