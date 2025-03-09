import { Module } from '@nestjs/common';
import { UniqueIdentifierService } from './services/unique-identifier-service.service';

@Module({
  providers: [
    {
      provide: 'IUniqueIdentifierService',
      useClass: UniqueIdentifierService,
    },
  ],
  exports: [
    {
      provide: 'IUniqueIdentifierService',
      useClass: UniqueIdentifierService,
    },
  ],
})
export class SharedModule {}
