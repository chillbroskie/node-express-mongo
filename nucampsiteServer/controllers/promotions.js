const Promotion = require('../models/promotion');

const getPromotions = (req, res, next) => {
    Promotion.find()
    .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
    })
    .catch(err => next(err));
};

const createPromotion = (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
      console.log('Promotion created', promotion);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    })
    .catch(err => next(err));
};

const updatePromotion = (req, res) => {
    res.statusCode = 403;
    res.end('PUT OPERATION not supported on /promotions');
};

const deletePromotion = (req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
    .catch(err => next(err));
};


const getPromotionId = (req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    })
    .catch(err => next(err));
};

const createPromotionId = (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
};

const updatePromotionId = (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));   
};


const deletePromotionId = (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
};

module.exports = {
    getPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
    getPromotionId,
    createPromotionId,
    updatePromotionId,
    deletePromotionId

};