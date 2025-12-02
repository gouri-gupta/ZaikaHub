import orderModel from "../models/Order.js"
import mongoose from "mongoose"

//This is used for creating an order i.w when the user clicks on "PLACE ORDER"
export const createOrder = async (request, response) => {
    console.log(request.body)
    let { user_id, restaurant_id, home_chef_id, total_amount, items } = request.body
    //delivery_id is LEFT

    // ---------- BASIC VALIDATIONS ----------
    // 1️⃣ user_id must be valid
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return response.send({
            message: "Invalid user_id",
            success: false,
            result: null
        });
    }

    // 2️⃣ total amount must not be zero
    if (!total_amount || total_amount === 0) {
        return response.send({
            message: "Total amount must be greater than zero",
            success: false,
            result: null
        });
    }

    // 3️⃣ items must not be empty
    if (!items || !Array.isArray(items) || items.length === 0) {
        return response.send({
            message: "Items array cannot be empty",
            success: false,
            result: null
        });
    }

    // ---------- RESTAURANT / HOMECHEF VALIDATIONS ----------
    const hasRestaurant = restaurant_id !== null && restaurant_id !== "" && restaurant_id !== undefined;
    const hasHomeChef = home_chef_id !== null && home_chef_id !== "" && home_chef_id !== undefined;

    // 4️⃣ Must provide exactly ONE of restaurant_id OR home_chef_id
    if ((hasRestaurant && hasHomeChef) || (!hasRestaurant && !hasHomeChef)) {
        return response.send({
            message: "Provide exactly ONE of restaurant_id OR home_chef_id",
            success: false,
            result: null
        });
    }

    // 5️⃣ Whichever ID is provided must be a valid ObjectId
    if (hasRestaurant && !mongoose.Types.ObjectId.isValid(restaurant_id)) {
        return response.send({
            message: "Invalid restaurant_id",
            success: false,
            result: null
        });
    }

    if (hasHomeChef && !mongoose.Types.ObjectId.isValid(home_chef_id)) {
        return response.send({
            message: "Invalid home_chef_id",
            success: false,
            result: null
        });
    }

    // ---------- CREATE ORDER ----------

    try {
        const result = await orderModel.create(request.body)
        console.log(result)
        if (result != null) {
            response.send({
                "message": "Order placed",
                success: true,
                "result": result
            })
        }
        else {
            response.send({ message: "Something went wrong!Please try again", success: false, "result": null })
        }
    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}

//Every ObjectId must always be in quotes in JSON, regardless of what tool your are using.

//Whenever a user logs in Using this we will display the past orders of the user
// 
export const getOrderByUserID =async (request, response) => {
    console.log(request.params.id)
    let id = request.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid User ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await orderModel.find({"user_id":id})
        console.log(data)
        if (data.length>0) {
            response.send({
                "message": "Orders of a particular user found",
                success: true,
                "result": data
            })
        }
        else {
            response.send({ message: "This user has no orders", success: false, "result": [] })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}


//Whenever the user clicks "CANCEL ORDER"

export const cancelOrder=async (request,response)=>{
    console.log(request.params.id)
    let id = request.params.id  //this is _id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid Order ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await orderModel.findOneAndUpdate({ _id: id },{$set:{"delivery_id":null,"status":"cancelled"}},{new:true})    //Because each delivery document will contain a unique order_id
        //Additional options in findOneAndUpdate, such as new: true (to return the modified document), upsert: true (to insert a new document if no match is found).
        console.log(data)
        if (data) {
            response.send({
                "message": "Order cancelled successfully",
                success: true,
                "result": data
            })
        }
        else {
            response.send({ message: "Order not found", success: false, "result": data })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}



