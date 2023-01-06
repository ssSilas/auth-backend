import { Column, Model, Table } from "sequelize-typescript"

@Table({ tableName: 'user', modelName: 'user', freezeTableName: true  })
export class UserEntity extends Model{
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({})
  name: string

  @Column({})
  email: string

  @Column({})
  login: string

  @Column({})
  password: string

  @Column({})
  status: number

  @Column({})
  company: number
}