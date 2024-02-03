import { Injectable } from '@nestjs/common';
import { GptService } from '@modules/gpt/gpt.service';
import {
  GetGreetingTextRequest,
  GetGreetingTextResponse,
  GreetingFormat,
  Holiday,
  PersonStatus
} from '@modules/main/main.dto';

@Injectable()
export class MainService {
  constructor(
    private readonly gpt: GptService
  ) {
  }

  public async createGreeting(req: GetGreetingTextRequest): Promise<GetGreetingTextResponse> {
    let resultText = 'Поздравление нужно на праздник ';
    const holidayMap: Record<Holiday, string> = {
      [Holiday.Feb14]: '"День всех влюбленных 14 февраля"',
      [Holiday.Feb23]: '"День защитника отечества 23 февраля"',
      [Holiday.March8]: '"Международный женский день 8 марта"',
    };
    resultText += holidayMap[req.holiday];
    resultText += ' в формате ';
    switch (req.format) {
      case GreetingFormat.Poem:
        resultText += 'стихотворения 8 строчек';
        break;
      case GreetingFormat.Text:
        resultText += 'текста минимум 12 слов';
        break;
    }
    resultText += ' для ';
    switch (req.status) {
      case PersonStatus.Boyfriend:
        resultText += 'моего парня';
        break;
      case PersonStatus.Husband:
        resultText += 'моего мужа';
        break;
      case PersonStatus.Wife:
        resultText += 'моей жены';
        break;
      case PersonStatus.Girlfriend:
        resultText += 'моей девушки';
        break;
    }
    resultText += `. Мы вместе уже ${req.yearsTogether} лет. А зовут мою вторую половинку ${req.name}`;
    const result = await this.gpt.runFullSync(resultText, [
      {
        role: 'user',
        content: 'Ты помощник, который генерирует поздравления для второй половинки. В следующем сообщении я опишу тебе пол, возраст, кем является для меня этот человек и формат, в котором нужно отдать поздравление. Спасибо!'
      }
    ]);
    return {
      text: result
    };
  }
}
