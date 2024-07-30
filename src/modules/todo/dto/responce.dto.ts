import { IsString } from 'class-validator';

export class ResponceDTO {
  @IsString()
  result: string;
}

/*
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ResponceDTO {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsBoolean()
  isChecked: boolean;
}

*/
