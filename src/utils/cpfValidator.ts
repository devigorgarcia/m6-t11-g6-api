import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export const cpfValidator = (cpf: string) => {
  let sum = 0;
  let rest = 0;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) {
    throw new HttpException('CPF Inválido', HttpStatus.BAD_REQUEST);
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
  }

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) {
    throw new HttpException('CPF Inválido', HttpStatus.BAD_REQUEST);
  }
};
