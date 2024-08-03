import { Injectable } from '@nestjs/common';
import type { IHashService } from 'apps/auth/src/domain/adapters/services/hash/hash.interface';
import { password } from 'bun';

@Injectable()
export class HashService implements IHashService {
  rounds = 10;

  public async hashAsync(value: string): Promise<string> {
    return await password.hash(value);
  }

  public async compareAsync(value: string, hashValue: string): Promise<boolean> {
    return await password.verify(value, hashValue);
  }
}
