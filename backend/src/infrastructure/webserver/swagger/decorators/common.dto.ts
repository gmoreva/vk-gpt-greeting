import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}
