import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './company.entity';

@Module({
  controllers: [CompanyController],
  providers: [
    {
      provide: 'COMPANY_REPOSITORY',
      useValue: CompanyEntity
    }
  ],
  exports:['COMPANY_REPOSITORY']
})
export class CompanyModule { }
