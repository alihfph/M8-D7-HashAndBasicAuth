import atob from "atob"

import AuthorModel from "../services/authors/schema.js"

export const basicAuthMiddleware = async (req, res, next) => {
   if (!req.headers.authorization) {
       const error = new Error ("please provide auth")
       error.httpStatusCode = 401
       next(error)
   } else {
       const decode = atob(req.headers.authorization.split(" ")[1])
       const [email, password] = decode.split(" ; ")

       const author = await AuthorModel.checkCredentials(email, password)
       if (author) {
           req.author = author
           next()
       } else {
           const error = new Error("credentials are wrong")
           error.httpStatusCode = 401
       }
   }
}

export const adminOnly = (req, res, next) => {
    if (req.user.role === "admin") {
        next()
    } else {
        const error  = new Error ("Admin only")
        error.httpStatusCode = 403
        next(error)
    }

}