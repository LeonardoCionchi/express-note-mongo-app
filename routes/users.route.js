import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';

const usersRoute = express.Router();

usersRoute.post('/api/register',
//validazione
async (request, response) => {
    const user = 'utente creato'
    return response.status(201).json({
        status: 'success',
        data: user,
    });
});



usersRoute.post('/api/register',
body('username').isLength({min: 5, max:10}),
body('email').isEmail(),
body('password').isLength({min: 8, max:50}),
async (request, response)=> {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(200).json({
            status: 'fail',
            errors: errors.array(),
        });
    }

    try {
        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: request.body.title,
        });
        await user.save();
        return response
      .status(201)
      .json({
          status: 'success',
          data: user,
      });
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(), 
        });
    }
});









export default usersRoute;