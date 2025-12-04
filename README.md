# 🍽️ ZaikaHub – Full-Stack Food Delivery Web Application (MERN)

ZaikaHub is a **full-stack MERN food delivery platform** that connects users with restaurants and home chefs.  
It offers a smooth, interactive experience for browsing menus, managing carts, placing orders, tracking deliveries, and handling cancellations — all built with production-style architecture.

This project implements complete **frontend + backend integration**, using:
- **React + Context API** for state management  
- **Node.js + Express** for REST API development  
- **MongoDB** for real-time data storage  
- **Mongoose** for schema modeling  

---

## 🚀 Features

### 👨‍🍳 User Experience
- Browse restaurants and home-chefs with filters (city, cuisine, veg-only)
- View dynamic menus
- Add/remove items from cart with quantity update
- Persistent cart (saved per user using `localStorage`)
- Place orders from **multiple vendors** in a single checkout

### 📦 Order & Delivery System (Backend)
- Automatic order grouping (restaurant-wise / homechef-wise)
- Order creation with:
  - Items
  - Amount
  - Timestamp
  - Vendor details
- Automatic delivery creation:
  - Assigned delivery partner
  - Live delivery status
- Cancel order:
  - Updates order status
  - Deletes delivery record

### 🛠 Backend Features
- Fully structured Express backend:
  - `/users`
  - `/restaurants`
  - `/homechefs`
  - `/orders`
  - `/deliveries`
- Controllers, routes, and models separated for clean architecture  
- Error handling middleware  
- MongoDB Atlas–ready schemas  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Context API  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### **Tools**
- VS Code  
- Git & GitHub  
- MongoDB Atlas / Compass  


## 💡 Future Enhancements

- JWT Authentication (Login/Signup)
- Delivery status timeline (preparing → out for delivery → delivered)
- Payment gateway simulation
- Admin dashboard (add restaurants, chefs, menus)

---

## 👩‍💻 Author

**Gouri Amit Gupta**  
[LinkedIn](https://www.linkedin.com/in/gourigupta2208)  
[GitHub](https://github.com/gouri-gupta)


