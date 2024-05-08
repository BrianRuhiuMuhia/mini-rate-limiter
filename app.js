const express=require("express")
const ipInfo={
  userInfo:{
    ip:'',
    lastRequest:0,
    totalTimeBeforeEachRequest:0,
    count:0,
  }
    
}
const app=express()
const maxRequest=5
app.enable('trust proxy');
  
  const setLimit=(req, res, next) => {
    const time=new Date().getSeconds()
    const timeSinceLastRequest = time - ipInfo["userInfo"].lastRequest;
    if (ipInfo) {
      ipInfo["userInfo"].count+=1
      ipInfo["userInfo"].lastRequest=time
      ipInfo["userInfo"].totalTimeBeforeEachRequest+=time
    }
    if(ipInfo["userInfo"].count>maxRequest && timeSinceLastRequest<60 )
    {
    return res.json({"message":"Maximum Api Requests"})
    }
   
    next();
  };
app.get("/",setLimit,(req,res)=>{

return res.json({"data":[{
    "name":"John",
    "age":20,
    "address":"1234567890"
}]})
})
app.listen(5000,()=>{
    console.log("server running on port 5000")
})