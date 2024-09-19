import { User } from "../models/User";
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
    
}
