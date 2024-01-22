const express= require('express');
const mongoose= require('mongoose');
const router= express.Router();
const todoSchema= require('../schemas/todoSchema');

const Task= new mongoose.model('Task', todoSchema);


// All Todo Show
router.get('/', async (req, res)=>{

});

// Get Single Todo by ID
router.get('/:id', async (req, res)=>{

});

// Post a Single Todo 
router.post('/', async (req, res)=>{
    const newTask= new Task(req.body)
    try{
        newTask.save();
        res.status(200).json({message: "Successfully Store Data"})
    }
    catch(err){
        res.status(500).json({error: "Something Wrong"})
    }
});

// Post Multiple Todo
router.post('/all', async (req, res)=>{
    // const newTask= new Task(req.body)
    try{
        await Task.insertMany(req.body);
        res.status(200).json({message: "Successfully Store Data"})
    }
    catch(err){
        res.status(500).json({error: err})
    }
});

// Update Single Todo by Id
router.put('/:id', async (req, res)=>{
    try{
        await Task.updateOne({_id: req.params.id}, {$set:{status: req.body.status}})
        // const result= await Task.findByIdAndUpdate({_id: req.params.id}, {$set:{status: req.body.status}}, {new: true})
        res.status(200).json({message: "Successfully Store Data"})
        // console.log(result);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

// Delete Single TOdo by Id
router.delete('/all', async (req, res)=>{
    try{
        
        res.status(200).json({message: "Successfully Store Data"})
    }
    catch(err){
        res.status(500).json({error: err})
    }
});

module.exports= router;