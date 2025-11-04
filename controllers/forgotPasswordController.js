import { forgotPasswordValidation } from "../validators/forgotPasswordValidator.js";
import User from "../models/user.js";
import crypto from 'crypto';

export const forgotPassword = async (req, res) => {
    try {
        const {error} = forgotPasswordValidation.validate(req.body);
        if(error){
            return res.status(400).json({ message: error.details[0].message })
        }

        const { Email } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        res.status(200).json({
            message: "Password reset token generated successfully",
            resetToken,
        });
    } catch (error) {
        console.error("Forgot Password Error: ", error.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
}
