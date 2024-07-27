import { Module } from '@nestjs/common';
import { AuthMapperService } from './auth-mappers.service';

@Module({
  exports: [AuthMapperService],
  providers: [AuthMapperService],
})
export class AuthMapperModule {}
