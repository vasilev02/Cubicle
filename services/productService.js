const Cube = require("../models/Cube");
const { search } = require("../controllers/productController");
const Accessory = require("../models/Accessory");

async function getAll(query) {
  let products = await (await Cube.find({}).lean());

  if (query.search) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(query.search)
    );
  }

  if (query.from) {
    products = products.filter((p) => Number(p.level) >= query.from);
  }

  if (query.to) {
    products = products.filter((p) => Number(p.level) <= query.to);
  }

  return products;
}

async function getProductById(id) {
  let cube = await Cube.findById(id).lean();
  return cube;
}

async function getProductAndAccessories(id) {
  let cube = await Cube.findById(id).populate("accessories").lean();
  return cube;
}

function create(data) {
  let cube = new Cube(data);
  return cube.save();
}

async function attachAccessory(productId, accessoryId) {
  let cube = await Cube.findById(productId);
  let accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessory);
  cube.save();
  
}

module.exports = {
  getAll,
  getProductById,
  create,
  attachAccessory,
  getProductAndAccessories
};
