import { createCustomError } from "../errors/custom-error.js";
import Task from "../models/Task.js"

const createTask = async (req, res, next)=>{
    try {
        const { description } = req.body;

        if (! description) {
            return next(createCustomError("Please provide all values", 400))
        }
        
        req.body.createdBy = req.user.userId;
        
        const task = await Task.create(req.body)
        res.status(201).json({task})
        
    } catch (error) {
        next(error)
    }
}

const getAllTask = async(req, res, next)=>{
    try {
        let result = Task.find({createdBy:req.user.userId });
    
        let tasks = await result;
    
        res.status(200).send({tasks})
    } catch (error) {
        next(error)
    }
}

//                                UPDATE TASK                             //   
const updateTask = async (req, res, next)=>{
   try {
     const {id: taskId} = req.params;
     const {description} = req.body;
 
     if(! description){
         return next(createCustomError("Please provide all values", 400));
     }
 
     const task =await Task.findOne({_id: taskId})
 
     if(! task){
         return next(createCustomError("No such task exists", 404))
     }
 
     const checkPermissions =(currentUser, userinDb)=>{
         if(currentUser.userId === userinDb.toString()) return
         return next(createCustomError("Unauthorized user", 401))
     }
 
     checkPermissions(req.user, task.createdBy)
 
     const updatedTask = await Task.findByIdAndUpdate({_id: taskId},req.body, {
         new: true,
         runValidators: true
     })
     res.status(200).json({updatedTask})
   } catch (error) {
        next(error)
   }
}

//                            DELETE TASK                              //
const deleteTask =async (req, res, next)=>{
   try {
     const {id: taskId} = req.params;
      
     const task = await Task.findOne({_id: taskId});
 
     if (!task) {
         return next(createCustomError("Task does not exists", 404))
     }
 
     const checkPermissions = (currentUser, userinDb)=>{
         if(currentUser.userId === userinDb.toString()) return
         return next(createCustomError("Unauthorized user", 401))
     }
 
     checkPermissions(req.user, task.createdBy);
 
     await task.remove();
     res.status(200).json({msg: "Success! task removed"})
   } catch (error) {
        next(error)
   }
}

export {createTask, getAllTask, updateTask, deleteTask}