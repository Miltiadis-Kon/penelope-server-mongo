const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://lms:q1w2e3r4t5@cluster0.sy4ywdt.mongodb.net/?retryWrites=true&w=majority";

const createProduct = async (req, res) => {
  const client = new MongoClient(url);
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    await client.connect();
    const database = client.db("lms");
    const result = await database.collection("products").insertOne(newProduct);
    res.status(200).json({ newProduct });
  } catch (error) {
    res.status(500).json({ message: "Could not create product." });
  }
  client.close();
};
const getProducts = async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db("lms");
    const products = await database.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Could not get products." });
  }
  client.close();
};

const getProduct = async (req, res) => {
  const client = new MongoClient(url);
  const productId = req.params.pid;
  try {
    await client.connect();
    const database = client.db("lms");
    const product = await database
      .collection("products")
      .findOne({ _id: productId });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Could not get product." });
  }
  client.close();
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
