import { Module } from '@nestjs/common';
import { WebServerSetup } from './web.server.setup';
import { WebServerConfig } from '@infrastructure/webserver/web.server.config';
import { SwaggerSetupService } from '@infrastructure/webserver/swagger/swagger-setup.service';

@Module({
  imports: [],
  providers: [WebServerSetup, WebServerConfig, SwaggerSetupService],
  exports: [WebServerSetup],
})
export class WebServerModule {
}
