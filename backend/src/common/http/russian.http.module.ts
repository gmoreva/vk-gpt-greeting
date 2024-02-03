import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import {
  HttpModuleAsyncOptions,
  HttpModuleOptions,
} from '@nestjs/axios/dist/interfaces';
import { RussianHttpConfig } from '@common/http/russian.https.config';
import { certedOptions } from '@common/http/russian_trusted_root_ca_pem.crt';

export class RussianHttpModule extends HttpModule {
  static register(config?: HttpModuleOptions): DynamicModule {
    return HttpModule.register({
      ...certedOptions,
      ...config,
    });
  }

  static registerAsync(options?: HttpModuleAsyncOptions): DynamicModule {
    return HttpModule.registerAsync({
      useClass: RussianHttpConfig,
      ...options,
    });
  }
}
