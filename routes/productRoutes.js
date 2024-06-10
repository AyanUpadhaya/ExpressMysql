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


