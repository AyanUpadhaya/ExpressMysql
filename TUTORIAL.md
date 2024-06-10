## Express with Mysql Tutorial

**Initial Programme**

```js
import express from "express";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  res.send("Got it");
});

app.listen(port, () => console.log(`server running on port:${port}`));
```

**Handling form data with multer (not used)**

```js
const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();

app.post("/submit-form", upload.none(), (req, res) => {
  // Access form data here
  const formData = req.body;
  console.log(formData);

  // Handle the form data
  // ...

  res.send("Form submitted successfully");
});
```

**Downloading Mysql latest from docker**

```bash
docker run --name sqldb -d -p 3306:3306 --rm -v mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD='test' mysql:latest
```

**Mysql commands**

```sql
create database ecom;
use ecom;

CREATE TABLE(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price INT NOT NULL
);
```

**CREAT DABASE CONNECTION**

```js
import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();
const pool = createPool({
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
});

const connectionToDatabase = async () => {
  try {
    await pool.getConnection();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error");
    console.log(error);
  }
};

export { connectionToDatabase, pool };
```

**DATABASE QUERIES**

```js
import { pool } from "./db.js";

export const find = async () => {
  const QYERY = "SELECT * FROM products";
  try {
    const client = await pool.getConnection();
    const result = await client.query(QYERY);
    return result[0];
  } catch (error) {
    console.log("Error occured while finding all the records");
    console.log(error);
  }
};
export const findById = async (id) => {
  const QYERY = "SELECT * FROM products WHERE id = ?";
  try {
    const client = await pool.getConnection();
    const result = await client.query(QYERY, [id]);
    return result[0];
  } catch (error) {
    console.log("Error occured while finding the record");
    console.log(error);
  }
};
export const create = async (title, description, price) => {
  const QYERY = `INSERT INTO products (title,description,price) VALUES (?,?,?)`;
  try {
    const client = await pool.getConnection();
    const result = await client.query(QYERY, [title, description, price]);
    return result;
  } catch (error) {
    console.log("Error occured while creating the product");
    console.log(error);
  }
};
export const update = async (title, description, price, id) => {
  const QYERY = `UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?`;
  try {
    const client = await pool.getConnection();
    const result = await client.query(QYERY, [title, description, price, id]);
    return result[0];
  } catch (error) {
    console.log("Error occured while updating the product");
    console.log(error);
  }
};
export const deleteRecord = async (id) => {
  const QYERY = `DELETE FROM products WHERE id = ?`;
  try {
    const client = await pool.getConnection();
    const result = await client.query(QYERY, [id]);
    return result[0];
  } catch (error) {
    console.log("Error occured while deleteting the product");
    console.log(error);
  }
};
```

**PRODUCT CONTROLLERS**

```js
import {
  find,
  findById,
  create,
  update,
  deleteRecord,
} from "../database/query.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
    });
  }
};
export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await findById(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
    });
  }
};
export const createProduct = async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(403).json({
      message: "Required fields missing",
    });
  }
  try {
    const result = await create(title, description, price);
    return res.status(201).json({ product: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
    });
  }
};
export const updateProduct = async (req, res) => {
  const { title, description, price } = req.body;
  const id = req.params.id;
  if (!title || !description || !price) {
    return res.status(403).json({
      message: "Required fields missing",
    });
  }
  try {
    const result = await update(title, description, price, id);
    return res.status(200).json({ product: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
    });
  }
};
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteRecord(id);
    return res.status(200).json({ product: result });
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
    });
  }
};
```

**PRODUCT ROUTES**

```js
import { Router } from "express";
import {
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";
export const productRouter = Router();

productRouter.get("/products/all", getAllProducts);
productRouter.get("/product/:id", getProduct);
productRouter.post("/product/add", createProduct);
productRouter.put("/product/update/:id", updateProduct);
productRouter.delete("/product/delete/:id", deleteProduct);
```

**FINAL INDEX.JS**

```js
import express from "express";
import { productRouter } from "./routes/productRoutes.js";
import { connectionToDatabase } from "./database/db.js";
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use("/api/v1", productRouter);

connectionToDatabase()
  .then(() => {
    app.listen(port, () => console.log(`server running on port:${port}`));
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
```
