const {createTaskService, DeleteTaskService, updateTaskStatusService, listTaskByStatusService, taskStatusCountService} = require("../../Services/Task Service/TaskService");

exports.createTask=async (req,res)=>{
    const result=await createTaskService(req);
    res.status(200).json(result);
}

exports.deleteTask=async (req,res)=>{
    const result=await DeleteTaskService(req);
    res.status(200).json(result);
}
exports.updateTaskStatus=async (req,res)=>{
    const result=await updateTaskStatusService(req);
    res.status(200).json(result)
}
exports.listofTaskByStatus=async (req,res)=>{
    const result=await listTaskByStatusService(req);
    res.status(200).json(result);
}

exports.taskStatusCount=async (req,res)=>{
    const result=await taskStatusCountService(req);
    res.status(200).json(result);
}