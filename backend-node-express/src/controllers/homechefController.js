import mongoose from "mongoose"
import homechefModel from "../models/Homechefs.js"

//used for displaying all the homechefs
export const getHomechefs=async(request,response)=>{
    const homechefData = await homechefModel.find()
    console.log(homechefData)
    response.send(homechefData)
}

//will be used to display the menu items of a particular homechef
export const getHomechefsByID=async(request,response)=>{
    let id = request.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid Homechef ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await homechefModel.findById(id)
        console.log(data)
        if (data != null) {
            response.send({
                "message": "Homechef found",
                success: true,
                "result": data
            })
        }
        else {
            response.send({ message: "Homechef not found", success: false, "result": null })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }


}