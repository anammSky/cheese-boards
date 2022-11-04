import { Model, DataTypes } from "sequelize";
import db from "../db/db";

class Cheese extends Model {}

Cheese.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db }
);

export default Cheese;
