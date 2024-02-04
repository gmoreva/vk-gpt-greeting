import { Test, TestingModule } from '@nestjs/testing';
import { GigachatService } from './gigachat.service';
import { GigachatConfig } from '@modules/gpt/gigachat/gigachat.config';
import { RussianHttpModule } from '@common/http/russian.http.module';

describe('GigachatService SDK', () => {
  let service: GigachatService;
  let accessToken: Awaited<ReturnType<typeof service.auth>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RussianHttpModule.register()],
      providers: [GigachatConfig, GigachatService],
    }).compile();

    service = module.get<GigachatService>(GigachatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should auth', async () => {
    const accessToken = await service.auth();
    expect(accessToken).toBeTruthy();
  });

  it('should send request', async () => {
    service.setAccessToken(accessToken)
    const textResult = await service.runFullSync(`
    Извлеки задачи, которые обсуждаются в тексте ниже. В задаче может быть указан срок и детали. Опиши это в виде одного json-массива. Поля JSON: task: короткое название задачи, text: детали задачи, date: дедлайн по задаче в формате ISO8601. Сегодняшняя дата 08.12.2023. 

1: Привет, как дела?
2: Привет, нормально. А у тебя?
1: У меня все хорошо. Слушай, я хотел спросить, ты можешь помочь мне с одной задачей?
2: Конечно, с радостью. Какая задача?
1: Я хочу, чтобы ты написал отчет по проекту, который мы начали несколько месяцев назад.
2: Хорошо, я могу это сделать. Какие сроки и какие детали должны быть включены в отчет?
1: Сроки - до конца этой недели. В отчете должны быть включены все ключевые показатели и результаты проекта за последние несколько месяцев.
2: Ясно, я понял. Я начну работать над отчетом прямо сейчас.
1: Спасибо, я очень ценю твою помощь. Если у тебя возникнут какие-либо вопросы, не стесняйся обращаться ко мне.
2: Без проблем, я обязательно обращусь, если что-то будет неясно.
`);
    const taskInfo = JSON.parse(textResult);
    expect(taskInfo).toBeDefined()
  });
});
