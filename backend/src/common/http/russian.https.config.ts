import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { certedOptions } from '@common/http/russian_trusted_root_ca_pem.crt';

@Injectable()
export class RussianHttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return certedOptions;
  }
}
