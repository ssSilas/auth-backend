import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeEntity } from './employee.entity';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    {
      provide: 'EMPLOYEE_REPOSITORY',
      useValue: EmployeeEntity
    }
  ],
  exports: ['EMPLOYEE_REPOSITORY']
})
export class EmployeeModule { }