import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export const cepValidator = (data: string) => {
  const regex = /^[0-9]{5}-[0-9]{3}$/.test(data);

  if (!regex) {
    throw new HttpException('CEP Inválido', HttpStatus.BAD_REQUEST);
  }
};
