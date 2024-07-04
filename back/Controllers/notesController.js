const notesRouter = require('express').Router()
const Note=require('../models/NotPhone')

// NOTES------------
notesRouter.get('/', async (req, res) => {
    try {
      const notes = await Note.find({});
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las notas' });
    }
  });
  
  notesRouter.post('/',async(req,res)=>{
    const note = req.body;
    const noteObject = new Note({
      content: note.content,
      important: note.important || false,
    });
    noteObject.save()
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(400).json({
          error: error.message
        });
      });
  });

  
  notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})  


module.exports = notesRouter
