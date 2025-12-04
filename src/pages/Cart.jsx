import { useContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { cartContext } from '../context/CartProvider'
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { delivery } from './delivery.json' //we are importing delivery array therefore we write {delivery}
import axios from 'axios';
import toast from 'react-hot-toast'
import { BsCart4 } from "react-icons/bs";


const Cart = () => {

  let navigate = useNavigate()

  let userInfo = useContext(UserContext)
  let { user, isLoggedIn } = userInfo
  console.log("USER", user);


  let basket = useContext(cartContext)
  console.log("BASKET", basket);
  let { cart, updateItems, setCart } = basket
  console.log("CART", cart);
  //this cart is an array which contains all the food items added by the user
  //updateItems -function which is used for quatity update (+/-)
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const val = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(val);
  }, [cart]); // dependency array ensures it runs only when cart changes

  console.log("CART", cart);

  async function sendOrder(order_obj, del_obj) {
    try {
      await axios.post("http://localhost:5000/api/orders", order_obj);
      //await axios.post("http://localhost:4000/deliveries", del_obj)
      return true; // success
    } catch (error) {
      console.error("Error sending data:", error);
      return false;
    }
  }

  /*example of order object 
  {
  "_id": {
    "$oid": "689f600c64ae0cddb3eec4f5"
  },
  "user_id": {
    "$oid": "689f0715da1bfb28f3eec4ad"
  },
  "restaurant_id": {
    "$oid": "689f168cda1bfb28f3eec4d5"
  },
  "home_chef_id": null,
  "items": [
    {
      "item_id": {
        "$oid": "689f168cda1bfb28f3eec4c7"
      },
      "name": "Veg Hakka Noodles ",
      "quantity": 1,
      "price": 180
    }
  ],
  "total_amount": 180,
  "order_date": {
    "$date": "2024-02-10T09:20:00.000Z"
  },
  "status": "preparing",
  "delivery_id": {
    "$oid": "689f600c64ae0cddb3eec4f4"
  },
  "id": "8efd"
}
  */
  let placeOrder = async () => {

    //safety check - Prevents wasteful API calls if cart is empty
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    let group = cart.reduce((group, item) => {
      //find whether item is ordered from restaurant OR homechef i.e finding key name based on source
      let key = item.restaurant_id ? `restaurant_${item.restaurant_id}` : `homechef_${item.homechef_id}`

      //if key doesn’t exist yet, initialize it
      if (!group[key]) {
        group[key] = []
      }
      //push the item into that array
      group[key].push(item)
      return group
    }, {})
    console.log("GROUPED RESTAURANTS", group) //eg -> restaurant_689f119dda1bfb28f3eec4c5
    //console.log(delivery);

    //ORDER AND DELIVERY  LOGIC 
    let flag = true;  //checks if any POST FAILS
    for (let ele in group) {
      if (group.hasOwnProperty(ele)) {
        let value = group[ele] //this value is an array
        console.log("KEY", ele, "VALUE", value);
        //value is an array eg of element of array ->{name: 'Amritsari Kulcha ', price: 150, category: 'Main Course', entity_name: 'Delhi Tandoor', restaurant_id: '689f2061da1bfb28f3eec500', …}
        //let orderid = uuidv4()
        //let deliveryID = uuidv4()
        let obj = {
          user_id: user.userid ,
          restaurant_id: {},
          home_chef_id: {},
          items: [],
          total_amount: 0
        }
        //now add the values for remaining keys

        //setting the id's  of restaurant and homechef
        //console.log("R_ID :",value[0].restaurant_id);
        //console.log("HC_ID :",value[0].homechef_id);
        if (value[0].restaurant_id) {
          obj.restaurant_id = value[0].restaurant_id ;
          obj.home_chef_id = null;
        } else {
          obj.restaurant_id = null;
          obj.home_chef_id = value[0].homechef_id ;
        }


        //Adding food items to items array
        //value is an array ->food item relevant info in value object ->category: "Main Course" ; item_id: {$oid: '689f2061da1bfb28f3eec4f7'} ; name: "Amritsari Kulcha " ; price : 150 ; quantity: 1
        //obj.items is an array of objects.Each object in this array contain the following properties 
        /*{
            "item_id":  "689f168cda1bfb28f3eec4c7",
            "name": "Veg Hakka Noodles ",
            "quantity": 1,
            "price": 180
          }*/

        //value is an array ->map
        let arr = value.map((val) => {
          return { item_id: val.item_id, name: val.name, quantity: val.quantity, price: val.price }
        })
        //console.log(arr);
        obj.items = arr

        //Calculate total amount
        const total = value.reduce((acc, item) => acc + item.price * item.quantity, 0)
        //console.log(total);
        obj.total_amount = total

        console.log("ORDER OBJECT", obj);

        //FOR EACH ORDER YOU ALSO NEED  CORRESPONIDNG DELIVERY DOCUMENT
        //SO NOW CREATING A DELIVERY OBJECT -> done in backend

        //Now post this order and delivery object to the respective dbs i.e jsons
        try {
          await axios.post("http://localhost:5000/api/orders", obj);
          //return true; // success
        } catch (error) {
          flag = false;
          console.error("Error sending data:", error);
          break //even if one API call fails (say, first restaurant order) ->abort everything
          //return false;
        }

      }
    }
    if (flag == true) {
      toast.success("Order placed successfully")
      setCart([]) //once the user placed an order for the items in cart ->The CART will become EMPTY
      setTimeout(() => navigate('/orders'), 2000);
    }
    else {
      toast.error("Something went wrong!Please try again")
      setTimeout(() => navigate('/'), 2000);
    }
  }

  return (
    <main>
      <Navbar></Navbar>
      <section className=' m-5 flex flex-col '> {/*border border-solid border-black */}
        <div className='flex items-center justify-center gap-2 text-4xl font-bold font-sans m-2 text-red-700'><span>Your Cart</span><BsCart4 /></div>
        <div className='m-2  flex items-center gap-15'> {/*border border-solid border-green-500 */} {/*Make this section sticky afterwards because later on every page except home page You have to make the Navbar+that marquee sticky */}
          <p className='text-xl italic font-bold m-2 text-gray-600'>Cravings are just one click away 😋</p>
          <h1 className='font-sans font-bold text-2xl text-red-700'>Total Bill : {total}</h1>
          {
            isLoggedIn ? <button className='outline-2 outline-red-800 outline-offset-0  bg-white rounded-2xl font-bold text-red-700  text-xl  m-2 p-2 cursor-pointer hover:bg-gray-100 hover:scale-105' onClick={placeOrder}>Place Order</button> :
              <button disabled className='bg-gray-700 text-white text-xl font-bold m-2 p-2 cursor-not-allowed' title='Log in to place order'>Place Order</button>
          }
        </div>
        <section className=' m-2 flex flex-col gap-5'> {/*border border-solid border-orange-700 */}
          {
            cart.length == 0 ?
              <h1 className='font-sans font-bold text-2xl text-red-700'>Your cart is empty!
                Explore our restaurants and find something delicious 🥗 🥗</h1> :

              cart.map((value) => {
                //console.log("CART VALUE ",value);
                return (
                  <div key={value.item_id} className='  flex flex-col bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-102 transition-transform duration-200'> {/*border border-solid border-blue-900 */}
                    <h1 className='m-2 text-2xl font-bold text-red-700'> {value.name} ({value.category})</h1>
                    <div className=' flex flex-row justify-between '> {/*border border-solid border-rose-500 */}
                      {
                        value.restaurant_id ?
                          <h1 className='m-2 italic'>{value.entity_name}</h1> :
                          <h1 className='m-2 italic'>{value.entity_name}</h1>
                      }
                      <h1 className='m-1 font-bold text-xl'>Price : {value.price * value.quantity}</h1>
                      {/* <h1 className='flex flex-row gap-1'>Quantity : {value.quantity} <button onClick={() => updateItems(value, "add")} className='bg-green-700 text-white text-2xl rounded-2xl'><GrAddCircle /></button> <button onClick={() => updateItems(value, "subtract")} className='bg-green-700 text-white text-2xl rounded-2xl'><GrSubtractCircle /></button></h1> <br /> <br />
 */}
                        <div className='m-1 flex items-center gap-1'>
                          <span>Quantity : {value.quantity}</span>
                          <button onClick={() => updateItems(value, "add")} className='bg-red-700 text-white text-2xl rounded-2xl'>
                            <GrAddCircle /></button>
                            <button onClick={() => updateItems(value, "subtract")} className='bg-red-700 text-white text-2xl rounded-2xl'>
                              <GrSubtractCircle /></button>
                        </div>
                    </div>
                  </div>
                )
              })

          }
        </section>
      </section>

      <Outlet></Outlet>
    </main>
  )
}

export default Cart


/*
Axios efficiency (optional)

Right now, you’re posting each order sequentially inside a loop.
That’s totally fine for small carts.
Later, for optimization, you can run them in parallel:

await Promise.all([
  axios.post("/orders", obj),
  axios.post("/deliveries", d_obj)
])
NO NEED TO CHANGE NOW ->ITS WORKING FINE NOW
*/


/*
Backend Implementation (for PLACE ORDER)

When you move to Node + Express, you’ll likely:

Handle /orders POST → Create order in MongoDB

Immediately create a linked delivery document (auto-assign a delivery person)

Return both objects (or at least the order confirmation) to frontend

That will make your system feel realistic — similar to how Zomato or Swiggy do it.
*/