import { OmmgService } from '@modules/ommg/ommg.service';
import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { GptService } from '@modules/gpt/gpt.service';

describe('Gpt Service SDK', () => {
  let service: GptService;
  beforeEach(async () => {
    const app = await (
      await Test.createTestingModule({
        imports: [HttpModule],
        providers: [GptService],
      }).compile()
    ).init();
    service = app.get(GptService);
  });

  describe('Gpt Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

  });
});
