import { Module } from '@nestjs/common';
import { GigachatModule } from './gigachat/gigachat.module';
import { GptConfig } from '@modules/gpt/gpt.config';
import { GptProviderSelector } from '@modules/gpt/gpt.provider.selector';
import { GptService } from '@modules/gpt/gpt.service';
import { MockProvider } from '@modules/gpt/mock.provider';

@Module({
  providers: [GptConfig, GptProviderSelector, GptService, MockProvider],
  imports: [GigachatModule],
  exports: [GptService],
})
export class GptModule {}
