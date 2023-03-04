const jwt = require('jsonwebtoken')
require("dotenv").config({path:"./.env"})
import { prisma } from "../lib/prisma"


module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'O token não foi aprovado'})
    
    const [,token] = authHeader.split(' ');
    
    jwt.verify(token,process.env.secret,(err, decoded)=>{
        if(err) return res.status(401).send({error:'Token invalido'})
    req.userId = decoded.id;
    return next();
    })
    
}