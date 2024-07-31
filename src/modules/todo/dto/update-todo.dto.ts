import { IsBoolean, IsString } from 'class-validator';

export class UpdateTextDTO {
  @IsString()
  text: string;
}

export class UpdateStatusDTO {
  @IsBoolean()
  isChecked: boolean;
}
