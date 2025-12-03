import express from 'express'
import { getDeliveryByID,createDelivery,cancelDeliveryByID } from '../controllers/deliveryController.js'

const router=express.Router()

//get delivery by a paritcular orderID
router.get("/:id",getDeliveryByID)


//cancel a delivery for a particular order ie order_id
router.delete("/:id",cancelDeliveryByID)

export default router

