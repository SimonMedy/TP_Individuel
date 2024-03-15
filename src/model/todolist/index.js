const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user')

const ToDoList = sequelize.define('ToDoList', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {timestamps: true})


ToDoList.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'todoList_belongsTo_user',
})

UserModel.hasMany(ToDoList, {
    foreignKey: 'userId',
    as: 'user_hasMany_todoList'
})

module.exports = ToDoList
