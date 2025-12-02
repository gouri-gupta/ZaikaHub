import express from 'express'
import { getUsers,createUser } from '../controllers/userController.js'

const router=express.Router()

router.get("/",getUsers)

router.post("/",createUser)

export default router

/*
| Function   | Final API         |
| ---------- | ----------------- |
| getUsers   | GET `/api/users`  |
| createUser | POST `/api/users` |

*/
