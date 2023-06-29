"use strict";
const express = require("express");
const userRoute = express.Router();
userRoute.get('/', (req, res) => {
    const userTest = ['pedro', 'Manu'];
    res.status(200).json(userTest);
});
userRoute.get('/:id', (req, res) => {
});
userRoute.post('/', (req, res) => {
});
userRoute.put('/{id}', (req, res) => {
});
userRoute.delete('/{id}', (req, res) => {
});
module.exports = userRoute;
