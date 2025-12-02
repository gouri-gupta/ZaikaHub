import express from 'express'
import {createOrder,getOrderByUserID,cancelOrder} from '../controllers/orderController.js'

const router=express.Router()

router.post("/",createOrder)

router.get("/:id",getOrderByUserID)

router.patch("/:id",cancelOrder)


export default router