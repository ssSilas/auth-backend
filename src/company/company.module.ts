import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './company.entity';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: 'COMPANY_REPOSITORY',
      useValue: CompanyEntity
    }
  ]
})
export class CompanyModule { }
