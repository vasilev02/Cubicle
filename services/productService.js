const Cube = require("../models/Cube");
const { search } = require("../controllers/productController");

function getAll(query){

    let products = Cube.getAll();

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
    return Cube.getOne(id);
}


function create(data){

    let cube = new Cube(data);

      cube.save();
}

module.exports = {
    getAll,
    getProductById,
    create
}