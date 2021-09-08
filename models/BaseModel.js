const fs = require("fs");
const path = require("path");
const productsData = require('../config/products.json');
 
 class BaseModel {

    save(){
        productsData.push(this);
        fs.writeFile(path.join(__dirname,"/../config/products.json"), JSON.stringify(productsData), (err) => {
            if(err){
                console.log(err);
                return;
            }
        });
      }
    
      static getAll(){
        return productsData;
      }
    
      static getOne(productId){
        return productsData.find(p => p.id === productId);
      }

}

module.exports = BaseModel;