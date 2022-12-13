import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export const validate_date = (date_req: string) => {
  const birthdayDate = String(date_req);
  console.log(birthdayDate);

  const birthday = birthdayDate.split('/')[0];
  const birthmonth = birthdayDate.split('/')[1];
  const birthyear = birthdayDate.split('/')[2];

  const currentYear = new Date().getFullYear();
  console.log(currentYear);

  if (+birthday > 31 || +birthday < 0) {
    throw new HttpException(
      `${birthday} is a invalid day, please insert a valid day!`,
      HttpStatus.BAD_REQUEST,
    );
  }

  if (+birthmonth > 12 || +birthmonth < 0) {
    throw new HttpException(
      `${birthmonth} is a invalid month, please insert a valid month!`,
      HttpStatus.BAD_REQUEST,
    );
  }

  // //birthday validator
  if (currentYear - +birthyear < 18) {
    throw new HttpException(
      'You must have at least 18 years old',
      HttpStatus.BAD_REQUEST,
    );
  }
};
