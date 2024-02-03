import { Module } from '@nestjs/common';
import { MainController } from '@modules/main/main.controller';
import { MainService } from '@modules/main/main.service';
import { GptModule } from '@modules/gpt/gpt.module';

@Module({
  imports: [GptModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {
}
