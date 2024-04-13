const express =require('express');
const app= express();
const db = require('../database/database');
const StorySchemaObject =require('../modals/story');

class storyService
{

   async storySave(data)
   {   
        try{
            const storySchmaMasterObject = new StorySchemaObject(data);         
            let storySchmaResult = await storySchmaMasterObject.save() 
            return storySchmaResult;        
        }catch(error){            
            return error;      
        }
   }
   async updateStory(dataUpdate, updateId)
   {
    try{              
        let storySchmaResult = await StorySchemaObject.findByIdAndUpdate
        (updateId, dataUpdate,{ new: true }); 
        //console.log(storySchmaResult)
        return storySchmaResult;        
    }catch(error){
        return error;      
    }
   }


   async storyListServices(data)
   {
    try {  
            if(data =="ALL")
            { const stories = await StorySchemaObject.find();
                return stories; 
            }else{            
                const startDate = new Date(data, 0, 1); 
                const endDate = new Date(data, 11, 31);        
                let stories = await StorySchemaObject.aggregate([
                    {
                        $match: {
                            dateTypes: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    }
                ]);             
                return stories;    
            } 
        
    } catch (error) {
        return error;    
    } 
   }

}
const storyServiceObject =new storyService();
module.exports = storyServiceObject;