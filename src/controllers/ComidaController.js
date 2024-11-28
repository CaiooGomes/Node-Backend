import { pool } from "../config/database.js";

export default class ComidaController {
    static async getAllComidas(req, res) {
        try {
            const {rows} = await pool.query(`SELECT * FROM "comida";`);
            return res.json(rows)
        } catch (error) {
            console.error("Error fetching comida:", error);
            res.status(500).json({message: "internal Server Error"})
        }
    }

    static async getComidaById(req,res) {
        const {id} = req.params;
        try {
            const {rows} = await pool.query(`SELECT * FROM "comida" WHERE id=$1;`, [id]);
            if (rows.length === 0){
                return res.status(404).json({message: "Comida not found"})
            }
            return res.json(rows[0]);
        } catch (error) {
            console.error("Error fetching comida:", error);
            res.status(500).json({message: "internal Server Error"})
        }
    }
    static async createComida(req,res){
        const {nome, description, note} = req.body;
        try {
            const {rows} = await pool.query(`INSERT INTO "comida" (nome, description, note) VALUES ($1,$2,$3) RETURNING *;`,
                [nome, description, note])
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error("Error creating comida". error);
            res.status(500).json({message: "internal Server Error"});
        }
    }
    static async updateComida(req,res){
        const {id} = req.params;
        const {nome, description, note} = req.body;
        try {
            const {rows} = await pool.query(
                `UPDATE "comida" SET nome = $1, description = $2, note = $3 WHERE id = $4 RETURNING *;`,
                [nome, description, note, id]
            );
            if (rows.length === 0) {
                return res.status(404).json({message: "comida not Found"})
            }
            res.json(rows[0]);
        } catch (error) {
            console.error("Error updating comida:", error);
            res.status(500).json({message: "internal Server Error"})
        }
    }
    static async deleteComida(req, res) {
        const {id} = req.params;
        try {
            const {rowCount} = await pool.query(`DELETE FROM "comida" WHERE id=$1;`, [id]);
            if (rowCount === 0) {
                return res.status(404).json({message: "Comida not found"});
            } 
            res.json({message: "Comida deleted successfully"});
        } catch (error) {
            console.error("Error deleting comida", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

