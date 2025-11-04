import { loginValidation } from "../validators/loginValidator.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const { Email, Password } = req.body;

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: user._id, Email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
            },
        });
        
    } catch (error) {
        console.error("Login Error: ", error.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
}
