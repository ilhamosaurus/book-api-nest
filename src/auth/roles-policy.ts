import { RolesBuilder } from 'nest-access-control';
import { Role } from './dto/dto/enums';

export const Roles_Policy: RolesBuilder = new RolesBuilder();

// prettier-ignore
Roles_Policy
  .grant(Role.USER)
    .readOwn('userBook')
    .create('userBook')
  .grant(Role.ADMIN)
    .extend(Role.USER)
    .readAny('allBook')
    .updateAny('allBook')
    .deleteAny('allBook')
