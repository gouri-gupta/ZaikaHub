import { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { UserContext } from './UserProvider'

export let cartContext = createContext()  //The cart will a global store

//Later I have an option of a quantity update like +/-
const CartProvider = ({ children }) => {

  let d = useContext(UserContext)
  //console.log("CART PROVIDER ",d);
  let { user } = d // // logged-in user details
  //console.log("CART PROVIDER ",user); //user ={name: '', email: '', phone: 0, userid: ''}

  let [cart, setCart] = useState([])  //It is (array of objects). Object will have key-value pair like {item:"",price:0,quantity:0} The object also contains other details like restaurant/homechef name and its id etc


  //This will contain 3 functions :
  //addToCart :user wants to add an item to cart
  // removeFromCart :user wants to remove an item to cart
  // clearCart ::user wants to REMOVE ALL items to cart

  //When the clicks on add to cart button in Menu page this function will be called and the respective item will be added to cart
  //This value parameter is an object like 
  /*{
      category: "Main Course"
      entity_name: "Harjit Singh"
      homechef_id: "689f581f64ae0cddb3eec4f0"
      item_id:  '689f581f64ae0cddb3eec4e1'
      name: "Butter Chicken"
      price: 320
      quantity: 1
      restaurant_id: null
  } */
  let addToCart = (value, entity) => {
    //entity =name of the Restaurant/Homechef from where the food items are ordered
    //entity ={entity_name,restaurant_id,homechef_id} //either restaurant_id can be NULL or homechef_id can be NULL
    let { name, price, category, item_id } = value
    let { entity_name, restaurant_id, homechef_id } = entity

    // Check if item already exists in cart
    let existing = cart.find(val => val.item_id === item_id)

    if (existing) {
      // Item exists → increase quantity
      let updatedCart = cart.map(val =>
        val.item_id === item_id
          ? { ...val, quantity: val.quantity + 1 }
          : val
      )
      setCart(updatedCart)
      toast.success("Quantity increased")
    }
    else {
      let newObj = { name, price, category, entity_name, restaurant_id, homechef_id, quantity: 1, item_id }
      setCart([...cart, newObj])
      toast.success("Item is added to cart successfully")
    }

  }

  //updateItems -function which is used for quatity update
  //action=increase(+) or decrease(-) thw quantity of the respective food item
  //here "item" is the food item of which user increses or decreases the quatity
  //item will be an object
  //item=target item which is to be updated
  let updateItems = (item, action) => {
    let currcart = [...cart] //Make a shallow copy of the cart array => new array that copies all elements from the current cart state so that you don’t mutate the existing state array (React expects immutability).
    let index_target = currcart.findIndex(val => val.item_id === item.item_id);
    //console.log(index_target);
    let itemToUpdate = currcart[index_target]
    if (action == "add") {
      itemToUpdate.quantity += 1;
      //itemToUpdate.price = itemToUpdate.price * itemToUpdate.quantity
      //console.log(itemToUpdate);
      currcart[index_target] = itemToUpdate
      //console.log(currcart);
      toast.success("Quantity increased")
    }
    else {
      itemToUpdate.quantity -= 1
      if (itemToUpdate.quantity == 0) {
        //means you need to remove the item from cart
        currcart.splice(index_target, 1)
        toast.success("Item Removed")
      }
      else {
        currcart[index_target] = itemToUpdate
        toast.success("Quantity decreased")
      }
    }
    setCart(currcart)
  }

  //each logged-in user should have their own cart
  //we’ll store each user’s cart in localStorage under a unique key like userId_cart.
  // Load user-specific cart when user logs in
  useEffect(() => {
    if (user.name) {
      const savedCart = localStorage.getItem(`${user.userid}_cart`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
    else {
      setCart([]); // if logged out, clear the cart
    }
  }, [user]); //whenever user object changes then this will get invoked

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user.name) {
      localStorage.setItem(`${user.userid}_cart`, JSON.stringify(cart));
    }
  }, [cart, user]); //whenever cart or user changes then this hook will get invoked

  /*
  WHAT DOES THE ABOVE 2 useEffect() hook do?
    When user logs in → loads their cart
    When cart changes → saves it to localStorage
    When user logs out → clears cart
  */

  return (
    <cartContext.Provider value={{ cart, setCart, addToCart, updateItems }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider


//“Cart persists across users — Aarav sees Gouri’s items.”

//FRONTEND LOGIC
/*
each logged-in user should have their own cart
we’ll store each user’s cart in localStorage under a unique key like userId_cart.
*/




/*
Option B — Backend (later)
Each user document in DB can have a cart field:
{
  "user_id": "...",
  "cart": [{ "item_id": "...", "quantity": 2 }]
}
Then you can sync cart data via APIs.
*/