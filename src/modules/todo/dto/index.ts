import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTodoReceiveRemote {
  @IsString()
  text: string;
}

export class CreateTodoResponseRemote {
  @IsString()
  result: string;
}

export class UpdateStatusTodoReceiveRemote {
  // @IsString()
  // text: string;

  @IsBoolean()
  isChecked: boolean;
}

// export class GetTodoResponseRemote {
//   @IsNumber()
//   id: number;

//   @IsString()
//   text: string;

//   @IsBoolean()
//   isChecked: boolean;
// }
