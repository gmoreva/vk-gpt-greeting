import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerSetupService {
  private readonly logger = new Logger(this.constructor.name);

  private readonly subPath = '/api/swagger';

  /**
   * # Set up swagger UI for this application
   *
   * ## Workaround
   * Should be applied before webserver start
   *
   * @param app
   * @param path
   */
  public setup(app: INestApplication, path: string): void {
    const builder = new DocumentBuilder();
    builder.setTitle(`Swagger UI`);

    const document = SwaggerModule.createDocument(app, builder.build());

    const swaggerPath = path || this.subPath;
    SwaggerModule.setup(swaggerPath, app, document);

    const swaggerUrl = `/${swaggerPath}`;

    this.logger.log(`Spawned UI at ${swaggerUrl}`);
  }
}
