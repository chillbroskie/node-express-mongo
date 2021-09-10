const express = require('express');
const promotionRouter = express.Router();
const promotionsController = require("../controllers/promotions");
const authenticate = require('../authenticate');


promotionRouter.route('/')
.get(promotionsController.getPromotions)
.post(authenticate.verifyUser, promotionsController.createPromotion)
.put(authenticate.verifyUser, promotionsController.updatePromotion)
.delete(authenticate.verifyUser, promotionsController.deletePromotion);


promotionRouter.route('/:promotionId')
.get(promotionsController.getPromotionId)
.post(authenticate.verifyUser, promotionsController.createPromotionId)
.put(authenticate.verifyUser, promotionsController.updatePromotionId)
.delete(authenticate.verifyUser, promotionsController.deletePromotionId);

module.exports = promotionRouter;