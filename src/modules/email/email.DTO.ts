import { IsNotEmpty } from 'class-validator';

export class SendEmailDTO {
  @IsNotEmpty()
  to: string;
}

export class ResetPasswordDTO {
  @IsNotEmpty()
  password: string;
}
