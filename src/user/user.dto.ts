import { PickType } from '@nestjs/mapped-types';
import { regisDto } from 'src/auth/dto/dto';

export class editDto extends PickType(regisDto, [
  'firstName',
  'lastName',
  'role',
] as const) {}
