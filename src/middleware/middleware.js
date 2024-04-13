const express = require('express');
const router = express.Router(); 
const jwt = require('jsonwebtoken');

const middleware = {
     
    JWTAuthData: async function(req, res, next) 
    {
        let token = req.headers.authorization;
        if(token)
        {
            try {
                const signedObj = jwt.verify(token, 'JwtKey');                 
                req.jwtVerifier = signedObj;
            } catch (error) {
                return res.status(400).json(error);
            }
            next();
        }
    }


}
module.exports = middleware;
