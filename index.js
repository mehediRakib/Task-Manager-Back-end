const app=require('./app');
const port = process.env.PORT || 7050
app.listen(port,()=>{
    console.log(`Server create on port ${port}`);
})
