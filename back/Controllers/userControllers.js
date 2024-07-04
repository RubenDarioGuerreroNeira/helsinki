const userRoutes=require('express').Router()
const User=require('../models/UserPhone')

//----USERS-------
userRoutes.delete('/:id', (request, response, next) => {
    User.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch(error => next(error));
  });
  
  
  userRoutes.post('/',async(req,res)=>{
    const user = req.body;
    const userObject = new User({
      name: user.name,
      number: user.number,
      
    });
      userObject.save()
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(400).json({
          error: error.message
        });
      });
  });
  
  userRoutes.put('/:id', (request, response, next) => {
    const { name, number } = request.body;
    User.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedUser => {
        response.json(updatedUser);
      })
      .catch(error => next(error));
  });
  
  
  userRoutes.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
  });
  
  module.exports=userRoutes;