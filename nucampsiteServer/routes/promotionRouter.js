const express = require('express');
const promotionRouter = express.Router();
const promotionsController = require("../controllers/promotions");
const authenticate = require('../authenticate');
const cors = require('./cors');


promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, promotionsController.getPromotions)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.createPromotion)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.updatePromotion)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.deletePromotion);


promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, promotionsController.getPromotionId)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.createPromotionId)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.updatePromotionId)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.deletePromotionId);

module.exports = promotionRouter;