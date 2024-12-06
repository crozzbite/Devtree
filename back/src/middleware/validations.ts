import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"


export const handleInputErrors = async (req: Request, res: Response, next:NextFunction) :Promise<any> => {
    // manage of errors 
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}