const express = require('express');
const favoriteRouter = express.Router();
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorite => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            req.body.forEach(campsiteId => {
               if (!favorite.campsites.includes(campsiteId)) 
                favorite.campsites.push(campsiteId);
            })
            favorite.save()
            .then(favorite => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));

        } else {
            // create favorite and add campsite id's
            Favorite.create({
                user: req.user._id,
                campsites: req.body
            })
            .then(favorite => {
                console.log('favorite made', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));

        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT OPERATION not supported favorites`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            res.send(favorite);
        } else {
            res.send('You do not have any favorites to delete');
        }
    })
    .catch(err => next(err));
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`GET OPERATION not supported`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            if (!favorite.campsites.includes(req.params.campsiteId)) {
                favorite.campsites.push(req.params.campsiteId);
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            Favorite.create({
                user: req.user._id,
                campsites: [req.params.campsiteId]
            })
            .then(favorite => {
                console.log('favorite made', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT OPERATION not supported favorites`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            const index = favorite.campsites.indexOf(req.params.campsiteId)
            // [1,2,3, 'dog'].indexOf('dog') 
            if (index > -1) {
                favorite.campsites.splice(index, 1)
            }
            favorite.save()
            .then(favorite => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            res.send('no favorite to delete');
        }

    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;