import { Injectable } from '@nestjs/common';
import type { IBcryptService } from 'apps/auth/src/domain/adapters/bcrypt.interface';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService {
  rounds = 10;

  public async hashAsync(hashString: string): Promise<string> {
    return await hash(hashString, this.rounds);
  }

  public async compareAsync(password: string, hashPassword: string): Promise<boolean> {
    return await compare(password, hashPassword);
  }
}
