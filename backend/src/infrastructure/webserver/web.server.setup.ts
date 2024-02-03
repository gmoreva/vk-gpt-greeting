import {
  INestApplication,
  Injectable,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { WebServerConfig } from './web.server.config';
import { SwaggerSetupService } from '@infrastructure/webserver/swagger/swagger-setup.service';

@Injectable()
export class WebServerSetup {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly config: WebServerConfig) {
  }

  public async setup(app: INestApplication) {
    const port = this.config.port;
    app.useGlobalPipes(new ValidationPipe({
      forbidUnknownValues: false
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
      origin: '*',
    });
    const swagger = app.get(SwaggerSetupService);
    await swagger.setup(app, '/api/swagger');
    this.logger.log(`Application is running on :${port}`);
    await app.listen(port);
  }
}
