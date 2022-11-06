import { Injectable } from '@angular/core';
import { UserDto } from './models/user-dto.model';

@Injectable()
export class AppService {
  constructor() {}

  public async createUser(user: UserDto) {
    await new Promise((res) => setTimeout(res, 2500));

    if (Math.random() < 0.5) {
      return Promise.reject('Request Failed');
    }
    // Backend call happening here.
    return { username: user.username, email: user.email, type: user.type };
  }
}
