const uniqid = require("uniqid");
const Cube = require("../models/Cube");
const fs = require('fs');
const path = require('path');
const productData = require("../data/productData");
const productsData = require('../config/products.json');
const { search } = require("../controllers/productController");

function getAll(query){

    let products = productsData;

    if(query.search){
        products = products.filter(p => p.name.toLowerCase().includes(query.search));
    }

    if(query.from){
        products = products.filter(p => Number(p.level) >= query.from);
    }

    if(query.to){
        products = products.filter(p => Number(p.level) <= query.to);
    }

    return products;
}

function getProductById(id){
    return productsData.find(p => p.id === id);
}


function create(data){

    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
      );

      productData.create(cube);
}

module.exports = {
    getAll,
    getProductById,
    create
}