const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"),
  TodolistModel = require("../todolist");

const TodoItem = sequelize.define(
  "TodoItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    todoListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: TodolistModel,
        key: "id",
      },
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

TodoItem.belongsTo(TodolistModel, {
  foreignKey: "todoListId",
  as: "todoItem_belongsTo_todolist",
});

TodolistModel.hasMany(TodoItem, {
  foreignKey: "todoListId",
  as: "todoList_hasMany_todoitems",
});

module.exports = TodoItem;
