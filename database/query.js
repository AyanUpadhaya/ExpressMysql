import { pool } from "./db.js";

export const find = async()=>{
    const QYERY = "SELECT * FROM products"
    try{
        const client = await pool.getConnection();
        const result  = await client.query(QYERY);
        return result[0]

    }catch(error){
        console.log('Error occured while finding all the records');
        console.log(error);
    }
}
export const findById = async(id)=>{
    const QYERY = "SELECT * FROM products WHERE id = ?"
    try{
        const client = await pool.getConnection();
        const result  = await client.query(QYERY,[id]);
        return result[0]

    }catch(error){
        console.log('Error occured while finding the record');
        console.log(error);
    }
}
export const create = async(title,description,price)=>{
    const QYERY = `INSERT INTO products (title,description,price) VALUES (?,?,?)`
    try{
        const client = await pool.getConnection();
        const result = await client.query(QYERY, [title, description, price]);
        return result

    }catch(error){
        console.log('Error occured while creating the product');
        console.log(error);
    }
}
export const update = async(title,description,price,id)=>{
    const QYERY = `UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?`
    try{
        const client = await pool.getConnection();
        const result = await client.query(QYERY, [title, description, price,id]);
        return result[0]

    }catch(error){
        console.log('Error occured while updating the product');
        console.log(error);
    }
}
export const deleteRecord = async(id)=>{
    const QYERY = `DELETE FROM products WHERE id = ?`
    try{
        const client = await pool.getConnection();
        const result = await client.query(QYERY, [id]);
        return result[0]

    }catch(error){
        console.log('Error occured while deleteting the product');
        console.log(error);
    }
}