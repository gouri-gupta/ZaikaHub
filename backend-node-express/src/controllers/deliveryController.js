import mongoose from "mongoose"
import deliveryModel from '../models/Deliveries.js'

//Whenever the user logs in and goes to the orders section It will display the past or current orders of the user 
// Here user will see a "Track Delivery" button Whenever user clicks on this track delivery button it should the display the delivery status for that particular order
export const getDeliveryByID=async(request,response)=>{
    console.log(request.params.id)
    let id = request.params.id  //this is order_id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid Order ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await deliveryModel.findOne({"order_id":id})    //Because each delivery document will contain a unique order_id
        console.log(data)
        if (data) {
            response.send({
                "message": "Delivery status of a particular order found",
                success: true,
                "result": data
            })
        }
        else {
            /*
            If delivery is NOT found ,it simply means
            👉 There is no delivery assigned yet OR
            👉 This order was cancelled OR
            👉 Delivery entry not created yet
            */
            response.send({ message: "Delivery not found for this order", success: false, "result": data })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}

/*Create Delivery (When Order is Placed)

This happens automatically when a user places an order.

Your createOrder controller will:
create an order document
automatically choose a delivery boy
automatically create a delivery document with {status: "assigned"}
store the delivery’s _id inside order.delivery_id */
export const createDelivery=(request,response)=>{
    response.send("This will create a delivery ")
}
//This function will not be called by frontend —
//It will be called internally from createOrder.

/*
Instead of deleting the delivery document when user cancels the order, you should:

1. Keep the delivery boy in the database (do NOT delete document)
Deleting a delivery boy is wrong — delivery boy still exists.

2. Just free him up → make him “available” again

Even though user clicks "Cancel Order", this function belongs to deliveryController because it affects Delivery collection.
*/
export const cancelDeliveryByID=async(request,response)=>{
    console.log(request.params.id)
    let id = request.params.id  //this is order_id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.send({
            "message": "Invalid Order ID",
            success: false,
            "result": null
        })
        return
    }

    try {
        const data = await deliveryModel.findOneAndUpdate({"order_id":id},{$set:{"order_id":null,"status":"available"}},{new:true})    //Because each delivery document will contain a unique order_id
        //Additional options in findOneAndUpdate, such as new: true (to return the modified document), upsert: true (to insert a new document if no match is found).
        console.log(data)
        if (data) {
            response.send({
                "message": "Order cancelled successfully!Delivery status updated",
                success: true,
                "result": data
            })
        }
        else {
            /*
            If delivery is NOT found ,it simply means
            👉 There is no delivery assigned yet OR
            👉 This order was cancelled OR
            👉 Delivery entry not created yet
            */
            response.send({ message: "Delivery not found for this order", success: false, "result": data })
        }

    } catch (error) {
        response.send({
            message: "Server error",
            success: false,
            result: null
        });
    }
}

/*
| Function                    | Purpose                                        | Called From                       |
| --------------------------- | ---------------------------------------------- | --------------------------------- |
| **getDeliveryByID**         | Track Delivery popup                           | frontend `/track-delivery` button |
| **createDelivery**          | Auto-assign delivery boy during order creation | internally from createOrder       |
| **cancelDeliveryByOrderID** | When user cancels order                        | frontend Cancel button            |

*/

/*
OPTIONAL (Not needed now, but adding later will be easy)
Update Delivery Status

If someday you want:

assigned → out for delivery → delivered

Then create:

updateDeliveryStatus()


But since your frontend does not have this functionality,
you do NOT create this function now.
*/




