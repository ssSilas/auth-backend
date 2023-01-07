import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'employee', modelName: 'employee', freezeTableName: true })
export class EmployeeEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  cpf: number

  @Column({ allowNull: false })
  status: number

  @Column({ allowNull: false })
  idCard: number
}