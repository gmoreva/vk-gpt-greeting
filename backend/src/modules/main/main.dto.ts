import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HelloWorldResponse {
  hello: boolean;
}

export class TestRequest {
  test: boolean;
}

export class TestResponse {
  success: boolean;
}

export enum PersonStatus {
  Wife = 'wife',
  Girlfriend = 'girlfriend',
  Boyfriend = 'boyfriend',
  Husband = 'husband',
}

export enum GreetingFormat {
  Poem = 'poem',
  Text = 'text'
}

export enum Holiday {
  March8 = 'march8',
  Feb23 = 'feb23',
  Feb14 = 'feb14'
}

export class GetGreetingTextRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(PersonStatus)
  status: PersonStatus;

  @IsNotEmpty()
  @IsNumber()
  yearsTogether: number;

  @IsNotEmpty()
  @IsEnum(GreetingFormat)
  format: GreetingFormat;

  @IsNotEmpty()
  @IsEnum(Holiday)
  holiday: Holiday;
}

export class GetGreetingTextResponse {
  text: string;
}