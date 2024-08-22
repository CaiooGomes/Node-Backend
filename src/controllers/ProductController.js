import { Product } from "../models/product.js"

export default class ProductController {

    static async getAllProducts(req, res) {
        const products = await Product.find();
        return res.json({ products });
    }

    static async createdProduct(req, res) {
        const { name, price, description } = req.body;
        const data = new Product();
        data.name = name;
        data.description = description;
        data.quantity = quantity;
        const res.json({message: "criado com sucesso!", data: this.createdProduct })
    }

    static async editProduct(res,req) {
        const { _id, name, quantity, description } = req.body;
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({message: "produto não encontrado"})
        }
        product.name = name;
        product.quantity = quantity;
        product.description = description;
        await Product.updateOne(product);
        const updatedProduct = await product.findById(_id);
        return res.json({ message: "Atualizado com sucesso!", data: updatedProduct });
    }

    static async deleteProduct(req, res) {
        const { _id } = req.params;
        await Product.findOneAndDelete(id);
        return res.json({ message: "deletado com sucesso!"})
    }
}