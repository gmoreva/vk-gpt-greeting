import { GptProviderInterface, GptRequestMessages } from '@modules/gpt/gpt.provider.interface';

export class MockProvider implements GptProviderInterface {
  isActive(): boolean {
    return true;
  }

  runFullSync(text: string, preprend: GptRequestMessages = []): Promise<string> {
    return Promise.resolve('Это тестовый ответ от бота');
  }
}
