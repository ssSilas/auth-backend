import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'company', modelName: 'company', freezeTableName: true  })
export class CompanyEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  cnpj: string

  @Column({ allowNull: false })
  status: number

  @Column({ allowNull: false })
  databasename: string
}