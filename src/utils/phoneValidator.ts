import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export const phoneValidator = (data: string) => {
  const regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/.test(data);

  if (!regex) {
    throw new HttpException('Telefone Inválido', HttpStatus.BAD_REQUEST);
  }
};
