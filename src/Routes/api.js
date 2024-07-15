const express=require('express');
const router=express.Router();

const userController=require('../controllers/Users/userController');
const authVerifyMiddleware=require('../Middleware/AuthVerifyMiddleware');
const taskController=require('../controllers/Task/TaskController');

router.post('/registration',userController.registration);
router.post('/login',userController.login);
router.get('/profileDetails',authVerifyMiddleware,userController.profileDetails);
router.post('/profileUpdate',authVerifyMiddleware,userController.profileUpdate);
router.get('/Logout',authVerifyMiddleware,userController.Logout);

//Recover Password
router.post('/Recover-verify-email',userController.RecoverVerifyEmail);
router.get('/Verify-OTP/:email/:otp',userController.OtpVerify);
router.post('/reset-password',userController.ResetPassword);

//Task Service
router.post('/createTask',authVerifyMiddleware,taskController.createTask);
router.get('/deleteTask/:id',authVerifyMiddleware,taskController.deleteTask);
router.post('/updateStatus/:id/:status',authVerifyMiddleware,taskController.updateTaskStatus);
router.get('/listTaskByStatus/:status',authVerifyMiddleware,taskController.listofTaskByStatus);
router.get('/taskStatusCount',authVerifyMiddleware,taskController.taskStatusCount);




module.exports=router;