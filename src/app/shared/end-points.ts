import {environment} from '@env';

export class EndPoints {
  static USERS = environment.REST_CORE + '/users';

  static ANNOUNCEMENT= environment.REST_CORE + '/Announcements';
  static CHAT= environment.REST_CORE + '/chats';

}
