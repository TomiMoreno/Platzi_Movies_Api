const express = require('express');
const moviesService = require('../services/movies');

function moviesApi(app){
    const router = express.Router();
    app.use('/api/movies', router);

    const MoviesService= new moviesService
    router.get('/', async (req,res,next)=>{
        const { tags } = req.query
        try {
            const movies = await MoviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        }
        catch(err){         
            next(err)
        }
    })
    router.get('/:id', async (req,res,next)=>{
        const { movieId } = req.params
        try {
            const movies = await MoviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        }
        catch(err){         
            next(err)
        }
    })
    router.post('/', async (req,res,next)=>{
        const { body: movie } = req
        try {
            const createMovieId = await MoviesService.createMovie({ movie })
            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            });
        }
        catch(err){         
            next(err)
        }
    })

router.put('/', async (req,res,next)=>{
    const { movieId } = req.params
    const { body: movie } = req
    try {
        const updatedMovieId = MoviesService.updateMovie({ movieId , movie })
        res.status(200).json({
            data: updatedMovieId,
            message: 'movie updated'
        });
    }
    catch(err){         
        next(err)
    }
})
router.delete('/:id', async (req,res,next)=>{
    const { movieId } = req.params
    try {
        const deletedMovie = await MoviesService.deleteMovie({movieId});
        res.status(200).json({
            data: deletedMovie,
            message: 'movie updated'
        });
    }
    catch(err){         
        next(err)
    }
})

}
module.exports = moviesApi;