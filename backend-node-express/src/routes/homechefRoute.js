import express from 'express'
import { getHomechefs,getHomechefsByID } from '../controllers/homechefController.js'

const router=express.Router()

//get all the restaurants
router.get("/",getHomechefs)

//get the restaurants by ID so as to display the menu of a particular restaurant
router.get("/:id",getHomechefsByID)

export default router