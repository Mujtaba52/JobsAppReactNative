import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'this is the signup feature';
  }
  login() {
    return 'this is the login feature';
  }
}
