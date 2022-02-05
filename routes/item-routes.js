const express = require('express');
const {addItem,getAllItems, getItem} = require('../controllers/itemController');

const router = express.Router();

router.post('/addItems', addItem);
router.get('/getItems', getAllItems);
router.get('/getItem/:id', getItem);

module.exports = {
    routes: router
}