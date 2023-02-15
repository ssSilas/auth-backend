import { Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { CompanyEntity } from "src/company/company.entity"

@Table({ tableName: 'user', modelName: 'user', freezeTableName: true })
export class UserEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: number

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  email: string

  @Column({ allowNull: false })
  login: string

  @Column({ allowNull: false })
  password: string

  @Column({ allowNull: false })
  status: number

  @ForeignKey(() => CompanyEntity)
  @Column({ allowNull: false })
  companyfk: number
}