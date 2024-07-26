import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'Todos',
})
export class Todo extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isChecked: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt?: any;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt?: any;
}
