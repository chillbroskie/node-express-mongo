const express = require('express');
const promotionRouter = express.Router();
const promotionsController = require("../controllers/promotions");
const authenticate = require('../authenticate');


promotionRouter.route('/')
.get(promotionsController.getPromotions)
.post(authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.createPromotion)
.put(authenticate.verifyUser, promotionsController.updatePromotion)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.deletePromotion);


promotionRouter.route('/:promotionId')
.get(promotionsController.getPromotionId)
.post(authenticate.verifyUser, promotionsController.createPromotionId)
.put(authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.updatePromotionId)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, promotionsController.deletePromotionId);

module.exports = promotionRouter;