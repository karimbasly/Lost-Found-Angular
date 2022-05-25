import {environment} from '@env';

export class EndPoints {
  static USERS = environment.REST_CORE + '/users';
  static ANNOUNCEMENT= environment.REST_CORE + '/Announcements';

}
