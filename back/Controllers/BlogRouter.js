const BlogRoutes=require('express').Router()

const Blog=require('../models/BlogModel')



BlogRoutes.get('/', async (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener los blogs' });
    });
});

BlogRoutes.post('/', async (req, res) => {
  const blog=new Blog(req.body)
  blog.save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json({
        error: error.message
      });
    });
});



  module.exports=BlogRoutes;