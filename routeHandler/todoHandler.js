const express= require('express');
const mongoose= require('mongoose');
const router= express.Router();
const todoSchema= require('../schemas/todoSchema');

const Task= new mongoose.model('Task', todoSchema);


// All Todo Show
router.get('/', async (req, res)=>{
    try{
        const allTask= await Task.find({}).select({_id: 0, __v: 0});
        res.status(200).json({allTask})
    }
    catch(err){
        res.status(500).json({error: "Something Wrong"})
    }

});

// Get Single Todo by ID
router.get('/:id', async (req, res)=>{
    try{
        const allTask= await Task.find({_id: req.params.id}).select({_id: 0, __v: 0});
        res.status(200).json({allTask})
    }
    catch(err){
        res.status(500).json({error: "Something Wrong"})
    }
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
        res.status(200).json({message: "Successfully Store Multiple Data"})
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
        res.status(200).json({message: "Successfully Update Data"})
        // console.log(result);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

// Delete Single TOdo by Id
router.delete('/:id', async (req, res)=>{
    try{
        await Task.deleteOne({_id: req.params.id})
        res.status(200).json({message: "Successfully Delete Data"})
    }
    catch(err){
        res.status(500).json({error: err})
    }
});

module.exports= router;