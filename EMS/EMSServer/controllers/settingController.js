import User from "../models/User.js";
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try {
        const {userID, oldPassword, newPassword} = req.body;

        const user = await User.findById({_id: userId})
        if(!user) {
            return res.status(404).json({success: false, error: "user not found"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch) {
            return res.status(404).json({success: false, error: "wrong password"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)

        const newUser = await User.findByIdAndUpdate({_id: userID}, {password: hashPassword})

        return res.status(200).json({success: true})

    } catch(error) {
         res.status(500).json({success: false, error: "setting error"})
    }
}

export {changePassword}