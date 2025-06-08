//we are generating a token and sending it to a cookie
//specially http only cookie
//after 7 days this will it is going to expire
import jwt from "jsonwebtoken"

export const generateTokens =(userId,res)=>{

    const token=jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    } )
    res.cookie("jwt",token, {
        maxAge: 7*24*60*60*1000,//ms
        httpOnly: true, //prevent xss attacks cross-site scripting attacks
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !=="development"
    })

    return token;
}
