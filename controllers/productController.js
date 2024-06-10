import { find,findById,create, update, deleteRecord } from "../database/query.js"


export const getAllProducts = async(req,res)=>{
    try{
        const products = await find()
        return res.status(200).json({products})

    }catch(error){
       return res.status(500).json({
            message:'Error occured'
        })
    }
}
export const getProduct = async(req,res)=>{
    const id = req.params.id;
    try {
      const product = await findById(id);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured"
      });
    }
}
export const createProduct = async(req,res)=>{
    const {title,description,price} = req.body;
    if(!title || !description || !price){
        return res.status(403).json({
            message: "Required fields missing"
        })
    }
    try {
      const result = await create(title, description, price);
      return res.status(201).json({product:result });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured",
      });
    }
    
}
export const updateProduct = async(req,res)=>{
     const { title, description, price } = req.body;
     const id = req.params.id;
     if (!title || !description || !price) {
       return res.status(403).json({
         message: "Required fields missing",
       });
     }
     try {
       const result = await update(title, description, price,id);
       return res.status(200).json({ product: result });
     } catch (error) {
       return res.status(500).json({
         message: "Error occured",
       });
     }
}
export const deleteProduct = async(req,res)=>{

     const id = req.params.id;
     try {
       const result = await deleteRecord(id);
       return res.status(200).json({ product: result });
     } catch (error) {
       return res.status(500).json({
         message: "Error occured",
       });
     }
}

