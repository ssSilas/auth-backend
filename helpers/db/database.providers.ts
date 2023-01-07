import { HttpException, HttpStatus } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.entity';
import config from './config';
import { CompanyEntity } from 'src/company/company.entity';
import { EmployeeEntity } from 'src/employee/employee.entity';

export const dbClient = async (dbName: string = config().database.dbClientNameDefault) => {
  try {
    const sequelize =
      new Sequelize(
        config().database.dbClientNameDefault,
        config().database.user,
        config().database.pass, {
        dialect: 'mysql',
        port: config().database.port,
        replication: {
          write: {
            host: config().database.host,
            port: config().database.port,
          },
          read: [{
            port: config().database.port,
          }]
        },
        pool: {
          max: 50,
          idle: 10000
        },
        define: {
          timestamps: false,
          freezeTableName: true
        },
      });

    sequelize.addModels([EmployeeEntity]);
    await sequelize.sync();
    return sequelize;
  } catch (error) {
    console.log(error)
  }
}

export const dbManager = async (id: number = 1) => {
  try {
    const sequelize =
      new Sequelize(
        config().database.dbManagerName,
        config().database.user,
        config().database.pass, {
        dialect: 'mysql',
        port: config().database.port,
        host: config().database.host,
        // replication: {
        //   write: {
        //     host: config().database.host,
        //     port: config().database.port,
        //   },
        //   read: [{
        //     port: config().database.port,
        //   }]
        // },
        pool: {
          // max: 30,
          idle: 10000
        },
        define: {
          timestamps: false
        }
      });

    sequelize.addModels([CompanyEntity, UserEntity]);
    await sequelize.sync();

    const getCompany: CompanyEntity = await CompanyEntity.findOne({
      raw: true,
      attributes: ["id", 'databasename'],
      where: { id }
    })
    return getCompany
  } catch (error) {
    console.log(error)
    throw new HttpException(
      { error: 'Banco não encontrado' },
      HttpStatus.BAD_REQUEST
    )
  }
}