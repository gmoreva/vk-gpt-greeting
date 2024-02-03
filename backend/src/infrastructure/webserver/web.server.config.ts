import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseConfig } from '@common/config/baseConfig';

@Injectable()
export class WebServerConfig extends BaseConfig {
  @IsNumber()
  @IsNotEmpty()
  port: number = parseInt(process.env.PORT || '3001');
}
