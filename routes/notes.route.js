import express from 'express';
import { body, validationResult } from 'express-validator';
import Note from '.././models/note.js';
const notesRoute = express.Router();


notesRoute.get('/api/notes', (request, response) => {
    try {
        const notes = Note.find({});
        return response
      .status(200)
      .json({
          status: 'success',
          data: notes,
      });
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(), 
        });
    }
    
});

notesRoute.post('/api/notes',
body('user').isLength({min: 1, max:50}),
body('title').isLength({min: 5, max:30}),
body('content').isLength({min: 1, max:100}),
body('date').isDate(), 
async (request, response)=> {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(200).json({
            status: 'fail',
            errors: errors.array(),
        });
    }

    try {
        const nota = new Note({
            user: request.body.user,
            title: request.body.title,
            content: request.body.content,
            date: request.body.date
        });
        await nota.save();
        return response
      .status(201)
      .json({
          status: 'success',
          data: nota,
      });
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(), 
        });
    }
});

notesRoute.get('/api/notes:id', async (request, response) => {
    try {
        const notes = await Note.findById(request.params.id);

        return response
      .status(200)
      .json({
          status: 'success',
          data: notes,
      });
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(), 
        });
    }
    
});

notesRoute.put('/api/notes:id', 
body('user').isLength({min: 1, max:50}),
body('title').isLength({min: 5, max:30}),
body('content').isLength({min: 1, max:100}),
body('date').isDate(),  
async (request, response) => {
    try {
        const nota = {
            user: request.body.user,
            title: request.body.title,
            content: request.body.content,
            date: request.body.date
        }

        const note = await Note.findByIdAndUpdate(request.params.id, nota, {
            returnOriginal: false
        });
        
        return response
      .status(200)
      .json({
          status: 'success',
          data: note,
      });
    } catch (err) {
        return response.status(404).json({
            status: 'fail',
            data: err.toString(), 
        });
    }
    
});



export default notesRoute;