import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MainModule } from '@modules/main/main.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { WebServerModule } from '@infrastructure/webserver/web.server.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
      serveRoot: '/',
      exclude: ['/api*'],
    }),
    WebServerModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
