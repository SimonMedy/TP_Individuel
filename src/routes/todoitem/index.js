const todoitemController = require('../../controller/todoitem');
const todoitemRoutes = require('express').Router()
const { checkIsAuth } = require('../../config/jwtConfig');

module.exports = (app) => {
    todoitemRoutes.get('/todoitem/', todoitemController.getAll)
    todoitemRoutes.post('/todoitem/create/', checkIsAuth, todoitemController.create)
    todoitemRoutes.put('/todoitem/update/:uuid', checkIsAuth, todoitemController.update)
    todoitemRoutes.delete('/todoitem/delete/:uuid', checkIsAuth, todoitemController.delete)
    todoitemRoutes.get('/todoitem/:uuid', todoitemController.getById)

    app.use('/api/v1/', todoitemRoutes);
}