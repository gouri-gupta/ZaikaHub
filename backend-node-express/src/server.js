//Remove "main": "index.js" in package.json Because your entry file is src/server.js, not index.js.
//you can run your backend using: npm run dev
import dotenv from "dotenv";
dotenv.config(); //loading .env
import { connectDB } from "./config/db.js";
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import restaurantRoutes from './routes/restaurantRoute.js'
import homechefRoutes from './routes/homechefRoute.js'
import orderRoutes from './routes/orderRoute.js'
import deliveryRoutes from './routes/deliveryRoute.js'
import { errorHandler } from "./middlewares/errorHandler.js";

const app=express()
app.use(errorHandler);

//console.log(process.env.PORT);
//console.log(process.env.MONGO_URL)

//global middlewares
//They must run before any routes
//They configure how your entire server works
app.use(express.json());
app.use(cors())

connectDB(process.env.MONGO_URL)

app.get("/",(request,response)=>{
    response.send("ZaikaHub backend running successfully")  //ONLY for checking server status.
})

app.use("/api/users", userRoutes)
app.use("/api/restaurants", restaurantRoutes)
app.use("/api/homechefs",homechefRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/deliveries",deliveryRoutes)

app.listen(process.env.PORT)


/*
| Feature     | Route Mounted      | Internal Route | Final URL              |
| ----------- | ------------------ | -------------- | ---------------------- |
| Users       | `/api/users`       | `GET /`        | `/api/users`           |
|             |                    | `POST /`       | `/api/users`           |
| Restaurants | `/api/restaurants` | `GET /`        | `/api/restaurants`     |
|             |                    | `GET /:id`     | `/api/restaurants/:id` |
| HomeChefs   | `/api/homechefs`   | `GET /`        | `/api/homechefs`       |
| Orders      | `/api/orders`      | `POST /`       | `/api/orders`          |
|             |                    | `GET /:id`     | `/api/orders/:id`      |
|             |                    |  `PATCH /:id`  | `/api/orders/:id`  |
| Deliveries  | `/api/deliveries`  | `GET /:id`     | `/api/deliveries/:id`  |
|             |                    | ``       | `/api/deliveries`      |
|             |                    | `DELETE /:id`  | `/api/deliveries/:id`   |

*/

//PLACE ORDER -> create Order document AND create a delivery document
//CANCEL ORDER -> update Order document AND update  a delivery document
//Both are interlinked

/*
ALL REQUIRED API's in ZaikaHub

🔸 Users
GET /api/users
POST /api/users (signup)
GET /api/users/:id (optional)

🔸 Restaurants
GET /api/restaurants
GET /api/restaurants/:id

🔸 HomeChefs
GET /api/homechefs
GET /api/homechefs/:id

🔸 Orders
POST /api/orders (place order)
GET /api/orders/user/:id (order history)

🔸 Delivery
GET /api/delivery/:orderId
POST /api/delivery (create delivery)
DELETE /api/delivery/:orderId (cancel)

*/