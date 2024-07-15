const TaskModel=require('../../Model/TaskModel');
const mongoose=require('mongoose');
const objectID=mongoose.Types.ObjectId

const createTaskService=async (req)=> {
    try {
        const reqBody = req.body;
        console.log(req.headers['email'])
        reqBody.email = req.headers['email'];
        const data = await TaskModel.create(reqBody);
        return {status: 'success', data: data};
    } catch (e) {
        return {status: "fail", data: e.toString()};
    }
}

const DeleteTaskService=async (req)=>{
   try{
       const id=new objectID(req.params.id);
       const email=req.headers['email']
       const data=await TaskModel.deleteOne({_id:id,email:email});
       return {status:"success",data:data};
   }catch (e) {
       return {status:"fail",data:e.toString()};
   }
}

const updateTaskStatusService=async (req)=>{
   try{
       const id=req.params.id;
       const status=req.params.status;
       const data=await TaskModel.updateOne({_id:id},{status:status});
       return {status:"success",data:data};
   }catch (e) {
       return {status:'fail',data:e.toString()};
   }
}

const listTaskByStatusService=async (req)=>{
    try{
        let status=req.params.status;
        const email=req.headers['email'];
        const result=await TaskModel.aggregate([
            {$match:{status:status,email:email}},
            {$project:{_id:1,email:1,title:1,description:1,status:1,
                    createdDate:{
                        $dateToString:{
                            date:"$createdDate",
                            format:"%d-%m-%Y"
                        }
                    }}}
        ])
        return {status:"success",data:result};
    }catch (e) {
        return {status:'fail',data:e.toString()};
    }
}

const taskStatusCountService=async (req)=>{
   try{
       const email=req.headers['email'];
       const data=await TaskModel.aggregate([
           {$match:{email:email}},
           {$group:{
                   _id:"$status",
                   sum:{$count:{}}
               }}
       ])
       return {status:'success',data:data};
   }catch (e) {
       return {status:'fail',data:e.toString()};
   }
}

module.exports={
    createTaskService,
    DeleteTaskService,
    updateTaskStatusService,
    listTaskByStatusService,
    taskStatusCountService
}