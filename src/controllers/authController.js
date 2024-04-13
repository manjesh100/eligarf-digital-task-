const express = require('express');
const router =  express.Router();
const authService = require('../service/authService');
const Validator = require('Validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authController {

    async sinupUser(req,res)
    {    
     let rules={
        username: 'required',       
        password: 'required',
       };
       const message={
           required: 'You are forgot :attr field ',                  
       }
       const passData = Validator.make(req.body, rules);
       if(passData.fails())
       {
           const errors =  passData.getErrors();  
           return res.status(400).json(errors); 
       }
        try {
          let password = req.body.password;
          const saltRules = bcrypt.genSaltSync(10);
          const saltpassword = bcrypt.hashSync(password, saltRules);
          const data = {
            username: req.body.username,            
            password: saltpassword
          }  
           let finalResult = await authService.sinupData(data);  
           
           return res.status(200).json({finalResult, 'message': 'Registration successfully Save'});          
        }catch(error) {
          return res.status(400).json(error)
        }
      
    }

    async loginUser(req,res)
    {     
         try 
         { 
                 const rules ={
                    username:'required',
                    password:'required'
                 }
                 const messages ={
                   required: 'You forgot the :attr field'                  
                 }
                 const validateData = Validator.make(req.body, rules);
                 if(validateData.fails())
                 {
                   const errors = validateData.getErrors();
                   return res.status(400).json(errors);
                 }
                 
                 let  username= req.body.username;                 
               
               const user = await authService.login(username)
               
               if(user == null)
                 {         
                   return res.status(500).json({'massage': '!user name not found'})
                 } 
               const password = req.body.password                   
               const passwordValidate = bcrypt.compareSync(password, user.password);
               
               if(passwordValidate)
               {                  
                 let authID = user._id;
                 const jwtToken = jwt.sign(
                   { authID, }, "JwtKey",{
                     algorithm: "HS256",
                     expiresIn: 3600,
                   })                                   
                  
                   return res.status(200).json({userdata: user, jwtToken,   "massage": "You are successfully logged in"});
               }
               else{
                 return res.status(500).json({"massage": "password does not match"});
               } 
         }catch(error){          
           return res.status(400).json(error.message);    
         }
       }


}


const authControllerObject = new  authController();
module.exports = authControllerObject;

