import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import config from 'helpers/db/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { CompanyEntity } from './company/company.entity';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config().database.host,
      port: config().database.port,
      username: config().database.user,
      password: config().database.pass,
      database: config().database.dbManagerName,
      models: [CompanyEntity, UserEntity],
      define: { updatedAt: false },
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    EmployeeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }