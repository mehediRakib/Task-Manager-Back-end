const app=require('./app');
const PORT=process.env.PORT || 7050;
app.listen(PORT,()=>{
    console.log(`Server create on port ${PORT}`);
})
