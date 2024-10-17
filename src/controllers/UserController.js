import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default class UserController {
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "user not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "invalid password" });
            }
            const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{
                expiresIn: '1h'
            })
            return res.status(200).json({token});
        }catch(error) {
            console.error("Error ao fazer login", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async RegisterUser(req, res) {
        const { name, email, password, confirmPassword } = req.body;
        if (confirmPassword !== password) {
            return res.status(400).json({ message: "Senhas são diferentes" });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({name, idade, email, password: hashedPassword});

            const createdUser = await newUser.save();
            return res.status(201).json({
                 message: "User created successfully",
                 data: createdUser,
            });
        } catch (error) {
            console.error("Error ao criar usuário", error);
            return res.status(500).json({ message: "Internal Server Error" });
        };
    }
    static async authenticateToken(req, res, next){
        const authHeader = req.headers['authorization'];
        if (authHeader == null){
            return res
                .status(401)
                .json({ message: "Unauthorized" });
        }

        jwt.verify(authHeader, process.env.JWT_SECRET,(err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token invalido" });
            }
            req.user = user;
            next();
        });
    }
    
}
