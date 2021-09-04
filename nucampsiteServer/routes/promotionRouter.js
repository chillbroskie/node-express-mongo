const express = require('express');
const promotionRouter = express.Router();
const promotionsController = require("../controllers/promotions");


promotionRouter.route('/')
.get(promotionsController.getPromotions)
.post(promotionsController.createPromotion)
.put(promotionsController.updatePromotion)
.delete(promotionsController.deletePromotion);


promotionRouter.route('/:promotionId')
.get(promotionsController.getPromotionId)
.post(promotionsController.createPromotionId)
.put(promotionsController.updatePromotionId)
.delete(promotionsController.deletePromotionId);

module.exports = promotionRouter;