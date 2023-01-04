import { Injectable } from '@nestjs/common';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcrypt {
  rounds = 10;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }
}
