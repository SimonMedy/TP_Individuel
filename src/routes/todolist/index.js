
const todolistController = require('../../controller/todolist');
const todolistRoutes = require('express').Router()
const { checkIsAuth } = require('../../config/jwtConfig');

module.exports = (app) => {
    todolistRoutes.get('/todolist/', todolistController.getAll)
    todolistRoutes.post('/todolist/create/', checkIsAuth, todolistController.create)
    todolistRoutes.put('/todolist/update/:uuid', checkIsAuth, todolistController.update)
    todolistRoutes.delete('/todolist/delete/:uuid', checkIsAuth, todolistController.delete)
    todolistRoutes.get('/todolist/:uuid', todolistController.getById)

    app.use('/api/v1/', todolistRoutes);
}