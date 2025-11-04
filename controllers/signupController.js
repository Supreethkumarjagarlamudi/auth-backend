import { signupValidation } from "../validators/signupValidator.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
    try {
        const {error} = signupValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const {FirstName, LastName, Email, Password} = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hashing Pwd
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(Password, salt);

        const newUser = await User.create({
            FirstName,
            LastName,
            Email,
            Password: hashedPwd,
        })

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                FirstName: newUser.FirstName,
                LastName: newUser.LastName,
                Email: newUser.Email,
            },
        });

        
    } catch (error) {
        console.error("Signup Error: ", error.message);
        res.status(500).json({ message: "Server Error, Please try again later."})
    }
}