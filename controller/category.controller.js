import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import CategorySchemaModel from '../models/category.model.js';
import url from 'url';

export var save=async (req,res,next)=>{
    var categoryDetails=req.body
    var cList=await CategorySchemaModel.find().sort({"_id":-1}).limit(1);
    var l=cList.length;
    var _id=l==0?1:cList[0]._id+1;
    categoryDetails={...categoryDetails,"_id":_id};
    var category = await CategorySchemaModel.create(categoryDetails);
    if(category)
      return res.status(201).json({"result":"Category added successfully...."});
    else
      return res.status(500).json({"result": "Server Error"});
}


export var updateCategory=async(request,response,next)=>{
  let userDetails = await CategorySchemaModel.findOne(JSON.parse(request.body.condition_object));
  if(userDetails){
     let category=await CategorySchemaModel.updateOne(JSON.parse(request.body.condition_object),{$set:JSON.parse(request.body.set_condition)});   
     if(category)
      return response.status(201).json({"msg":"success"});
     else
      return response.status(500).json({error: "Server Error"});
  }
  else
   return response.status(404).json({error: "Requested resource not available"});
}

export var deleteCategory=async(request,response,next)=>{
  var cDetails = await CategorySchemaModel.find(JSON.parse(request.body.condition_object));
  if(cDetails.length!=0){
    let result = await CategorySchemaModel.deleteMany(JSON.parse(request.body.condition_object)); 
    if(result)
     return response.status(201).json({"msg":"success"});
    else
     return response.status(500).json({error: "Server Error"});
  }
  else
    return response.status(404).json({error: "Resource not found"}); 
}

export var fetch=async (req,res,next)=>{
  var condition_object=url.parse(req.url,true).query;
  var cList = await CategorySchemaModel.find(condition_object);
  var l=cList.length;
  if(l!=0)
    return res.status(201).json(cList);
  else
    return res.status(500).json({"result": "Server Error"});
}




