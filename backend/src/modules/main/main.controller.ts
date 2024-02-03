import { Body, Controller, Post } from '@nestjs/common';
import { MainService } from '@modules/main/main.service';
import { GetGreetingTextRequest, GetGreetingTextResponse, } from '@modules/main/main.dto';

@Controller()
export class MainController {
  constructor(private readonly service: MainService) {
  }

  @Post('/getGreetingText')
  getGreeting(@Body() req: GetGreetingTextRequest): Promise<GetGreetingTextResponse> {
    return this.service.createGreeting(req);
  }
}
