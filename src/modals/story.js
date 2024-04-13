const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 200,
    },
    slog: {
        type: String,
        required: true,
       // maxlength: 10,
    },
    description: {
        type: String,
        required: true,
        maxlength: 9000
    },
    location: {
        type: String,
        required: true,
    },
    dateTypes: {
        type: Date,
        required: true,
        default: Date.now 
    },
    is_active: {
        type: Number,
        required: true,  
        default: 1,  
    }
});

// Create the model
const StorySchemaObject = mongoose.model('story_master', storySchema);
module.exports = StorySchemaObject;
