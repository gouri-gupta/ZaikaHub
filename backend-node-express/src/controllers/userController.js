
import userModel from "../models/Users.js"
//This deals with user and user collection

//We will use the below getUsers controller for login i.e when user is trying to login
//// GET all users (used for login check)
//LOGIN
export const getUsers=async (request,response)=>{
    const userData=await userModel.find()
    //console.log(userData);
    response.send(userData)
}

//We will use the below given controller to create a controller i.e when the user signs up this will be used
// CREATE a new user (signup)
//SIGNUP
export const createUser=async (request,response)=>{
    console.log(request.body)
    let {name,email,phone,address}=request.body
    if(!name || !email || !phone || !address.city || !address.street || !address.pincode){
        response.send({"message":"Please enter all the required data of name,email,phone,address(street,city,pincode)",
        success:false,
        "result":null})
        //return false  //useless Because Express does not care about returned values.You only want to stop the function execution.
        return 
    }
    const result=await userModel.create(request.body)
    response.send({"message":"data saved",
        success:true,
        "result":result})
}



