import { Product } from "../models/product.js"

export default class ProductController {

    static async getAllProducts(req, res) {
        const products = await Product.find();
        return res.json({ products });
    }

    static async createdProduct(req, res) {
        const { name, quantity, description } = req.body;
        const data = new Product();
        data.name = name;
        data.description = description;
        data.quantity = quantity;
        const createdProduct = await Product.create(data);
        return res.json({message: "criado com sucesso!", data: createdProduct });
    }

    static async editProduct(req, res) {
        const { _id, name, quantity, description } = req.body;
        const product = await Product.findById(_id);
        // Verificação correta para ver se o produto foi encontrado
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        // Atualização do produto
        product.name = name;
        product.quantity = quantity;
        product.description = description;
        // Corrigindo o método updateOne
        await Product.updateOne({ _id }, { name, quantity, description });
        // Buscar o produto atualizado
        const updatedProduct = await Product.findById(_id);
        return res.json({ message: "Atualizado com sucesso!", data: updatedProduct });
    }


    static async deleteProduct(req, res) {
        const { id } = req.params;
        await Product.findOneAndDelete(id);
        return res.json({ message: "deletado com sucesso!"})
    }
}