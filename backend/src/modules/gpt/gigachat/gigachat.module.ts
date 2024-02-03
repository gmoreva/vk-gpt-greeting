import { Module } from '@nestjs/common';
import { GigachatService } from './gigachat.service';
import { GigachatConfig } from '@modules/gpt/gigachat/gigachat.config';
import { RussianHttpModule } from '@common/http/russian.http.module';

@Module({
  imports: [RussianHttpModule.register()],
  providers: [GigachatService, GigachatConfig],
  exports: [GigachatService],
})
export class GigachatModule {}
