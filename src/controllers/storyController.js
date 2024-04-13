const express = require('express');
const router =  express.Router();
const storyServiceObject = require('../service/storyService');
const Validator = require('Validator'); 

class storyController { 

    async createStory(req,res)
    { 
     let rules={
        title: 'required',
        slog: 'required',   
        description: 'required',   
        location: 'required',  
       
       };
       const message={
           required: 'You are forgot :attr field ',
           email: ':attr not valid',               
       }
       const passData = Validator.make(req.body, rules);
       if(passData.fails())
       {
           const errors =  passData.getErrors();  
           return res.status(400).json(errors); 
       }
        try {
        const data = {
            userId:req.jwtVerifier.authID,
            title: req.body.title,
            slog: req.body.slog,
            description: req.body.description,          
            location: req.body.location,
          }
           let finalResult = await storyServiceObject.storySave(data);          
           return res.status(200).json({finalResult, 'message': 'Post save sucessfullay'});          
        }catch(error) {
          return res.status(400).json(error)
        } 
    }

    async updateStory(req, res)
    {  
        let rules={
            title: 'required',
            slog: 'required',   
            description: 'required',   
            location: 'required',  
           
           };
           const message={
               required: 'You are forgot :attr field ',
               email: ':attr not valid',               
           }
           const passData = Validator.make(req.body, rules);
           if(passData.fails())
           {
               const errors =  passData.getErrors();  
               return res.status(400).json(errors); 
           }
            try {
            const dataUpdate = {
                userId:req.jwtVerifier.authID,
                title: req.body.title,
                slog: req.body.slog,
                description: req.body.description,          
                location: req.body.location,
              }
                const updateId = req.query._id;
               let finalResult = await storyServiceObject.updateStory(dataUpdate, updateId);          
              return res.status(200).json({finalResult, 'message': 'Story successfully updated'});          
            }catch(error) {
              return res.status(400).json(error)
            }

    }
    async storyList(req, res) 
    {
        //const filter = req.query.filter; 
        //const id = req.params;       
        let rules={
            filter: 'required',
           };
           const message={
               required: 'You are forgot :attr field ',
               filter: ':attr not valid',               
           }
           const passData = Validator.make(req.body, rules);
           if(passData.fails())
           {
               const errors =  passData.getErrors();  
               return res.status(400).json(errors); 
           }
            try { 
               const finalResult = await storyServiceObject.storyListServices(req.body.filter);          
               return res.status(200).json({finalResult, 'message': 'Post  successfully Listed'});          
            }catch(error) {
              return res.status(400).json(error)
            }
    }
 }

 const storyControllerObject = new  storyController();
module.exports = storyControllerObject;