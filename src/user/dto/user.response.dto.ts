import { users } from '@prisma/client';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static fromPrisma(user: users): UserResponseDto {
    return new UserResponseDto(user.id, user.username, user.email);
  }
}
