//create schema for User collection
import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    address:{
        street:String,
        city:String,
        pincode:Number
    },
    join_date:{type:Date,default:Date.now}
})

const userModel=mongoose.model("Users", userSchema,"Users")
export default userModel

/*
You wrote:

const userModel = mongoose.model("Users", userSchema, "Users");


Here’s what each argument means:

1️⃣ "Users" (1st argument) → Model name

Mongoose internally converts model names to lowercase + plural:

"Users" → "users"

But since your actual MongoDB collection is "Users" (capital U),
this default behaviour would break.

2️⃣ userSchema → Schema definition
3️⃣ "Users" (explicit collection name) → This forces Mongoose to use EXACT collection name

You told Mongoose:

👉 “Do NOT convert the name.
👉 Use the collection exactly named Users in MongoDB.”

Because of this third parameter, it started working perfectly.

🧠 RULE TO REMEMBER FOREVER
Always match the MongoDB collection name EXACTLY when using the optional 3rd parameter.

This is how you write it safely:

mongoose.model("YourModelName", yourSchema, "ExactCollectionName")
*/

//Below given is an object of User collection (I copied this from mongoDB)
/*
{
  "_id": {
    "$oid": "689f0715da1bfb28f3eec4a9"
  },
  "name": "Aarav Sharma",
  "email": "aarav.sharma01@gmail.com",
  "phone": 9876543210,
  "address": {
    "street": "Carter Road, Bandra West",
    "city": "Mumbai",
    "pincode": 400050
  },
  "join_date": {
    "$date": "2023-01-10T10:00:00.000Z"
  }
}
*/

