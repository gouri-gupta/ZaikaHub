import restaurantModel from "../models/Restaurants.js"
import mongoose from "mongoose"
//used for displaying all the restaurants
export const getRestaurants = async (request, response) => {
    const restaurantData = await restaurantModel.find()
    response.send(restaurantData)
}

//will be used to display the menu items of a particular restaurant
export const getRestaurantByID = async (request, response) => {
    console.log(request.params.id)
    let id = request.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid Restaurant ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await restaurantModel.findById(id)
        console.log(data)
        if (data != null) {
            response.send({
                "message": "Restaurant found",
                success: true,
                "result": data
            })
        }
        else {
            response.send({ message: "Restaurant not found", success: false, "result": null })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}


