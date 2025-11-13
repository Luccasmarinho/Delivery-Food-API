import type { Request, Response, NextFunction } from "express"
import resetPasswordService from "../../services/user/resetPasswordService.js"

const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {token} = req.params
        const resetPassword = await resetPasswordService(token!) 
        return res.status(200).json({ message: "ok" })
    } catch (error) {
        next(error)
    }
}

export default resetPasswordController