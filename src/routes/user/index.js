
const usersController = require('../../controller/user');
const usersRoutes = require('express').Router()
const { checkIsAuth } = require('../../config/jwtConfig');

module.exports = (app) => {
    usersRoutes.get('/users/', usersController.getAll)
    usersRoutes.post('/users/create/', usersController.create)
    usersRoutes.put('/users/update/:uuid', checkIsAuth, usersController.update)
    usersRoutes.delete('/users/delete/:uuid', checkIsAuth, usersController.delete)
    usersRoutes.get('/users/:uuid', usersController.getById)

    app.use('/api/v1/', usersRoutes);
}