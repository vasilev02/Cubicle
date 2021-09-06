const fs = require("fs");
const path = require("path");
const productsData = require('../config/products.json');

module.exports = {
    create(product){
        productsData.push(product);
        fs.writeFile(path.join(__dirname,"/../config/products.json"), JSON.stringify(productsData), (err) => {
            if(err){
                console.log(err);
                return;
            }
        });
    }
};
