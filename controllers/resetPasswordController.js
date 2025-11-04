import { resetPasswordValidation } from "../validators/resetPasswordValidator.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';
export const resetPassword = async (req, res) => {
    try {
        const { error } = resetPasswordValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(newPassword, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successful" });   
    } catch (error) {
        console.error("Reset Password Error: ", error.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
}