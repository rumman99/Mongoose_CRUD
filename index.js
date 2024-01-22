const express= require('express');
const mongoose= require('mongoose');
const todoHandler= require('./routeHandler/todoHandler');

const app= express();
app.use(express.json());


mongoose
    .connect('mongodb+srv://tasnimrumman369:rumman1999@cluster-rumman0.pqu8dwy.mongodb.net/mongooseTodo?retryWrites=true&w=majority')
    .then(()=> console.log("Database Connected"))
    .catch((err)=> console.log(err));


// app.get('/', (req, res)=>{
//     res.send('ok')
// })

// Application Route //
app.use('/', todoHandler);

// Error Handle //
const errorHandle=(err, req, res, next)=>{
    if(res.headersSent){
        return next(err);
    }
    else{
        res.status(500).send(err)
    }
}

app.listen(3333, console.log('Listening to Port 3333'))