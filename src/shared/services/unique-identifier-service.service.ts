import { v7 as uuid } from 'uuid';
import { IUniqueIdentifierService } from '../gateways/services/unique-identifier.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueIdentifierService implements IUniqueIdentifierService {
  generate(): string {
    return uuid();
  }
}
