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

//Create Delivery (When Order is Placed)
 // NOT a route handler — helper function only
 //This function will not be called by frontend —
//It will be called internally from createOrder.
export const createDelivery=async (orderID) => {

    // 1. pick a random delivery boy template
    const sample = await deliveryModel.aggregate().sample(1);
    const deliveryBoy = sample[0];

    if (!deliveryBoy) return null;

    const { name, phone, tip, rating } = deliveryBoy;

    // 2. create new delivery document for THIS order
    const delivery = await deliveryModel.create({
        name,
        phone,
        order_id: orderID,
        status: "assigned",
        tip,
        rating
    });

    return delivery;   // return full document
};




/*
A cancelled order should not have a delivery record

because delivery never happened.

✔ The order still remains in order history

so user can see: “Cancelled Order — Feb 2024”

✔ The delivery boy’s record is removed

so he does NOT appear as "available", "assigned", etc.
Because now there is no delivery for that order.
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
        const data = await deliveryModel.deleteOne({"order_id":id})
        console.log(data)
        if (data) {
            response.send({
                "message": "Order cancelled successfully!Delivery document deleted",
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
Should cancelDelivery also be a helper function?
NO. cancelDelivery should NOT be converted into a helper function.
It must remain a normal controller with a route, because:
✔ It is triggered directly by a frontend action

When the user clicks “Cancel Order”, your process is:

Call:
PATCH /api/orders/:id → cancelOrder()
(update order document)

Then also call:
DELETE /api/delivery/:id → cancelDeliveryByID()
(delete that delivery document)

Because frontend explicitly needs to hit /api/delivery/:id, it should remain a real route controller, not an internal helper.
*/

/*
When to use helper functions?

You convert a function into a helper only when:

It must be used internally by another controller

It is not directly called by frontend

It must not send HTTP response (res.send)
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




