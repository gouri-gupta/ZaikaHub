import express from 'express'
import { getDeliveryByID,createDelivery,cancelDeliveryByID } from '../controllers/deliveryController.js'

const router=express.Router()

//get delivery by a paritcular orderID
router.get("/:id",getDeliveryByID)

//create a delivery for a particular order i.e order_id
router.post("/",createDelivery)

//cancel a delivery for a particular order ie order_id
router.patch("/:id",cancelDeliveryByID)

export default router

/*
BUT a cancelled order does not have a delivery_id in ZaikaHub.

Correct logic:

If order is cancelled → delete/update order

And set delivery status back to "available"

Maybe delete delivery doc

But this part depends on your design.
*/