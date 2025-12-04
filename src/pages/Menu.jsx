import { useEffect, useState, useContext } from 'react'
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { cartContext } from '../context/CartProvider';
import { IoLocation } from "react-icons/io5";


const Menu = () => {
    const [currentRest, setCurrentRest] = useState({
        name: "",
        food_type: "",
        menu_items: [],
        location: {},
    })
    //currentRest means the current restaurant or current homechef whose menu user has asked

    //// Access cart context
    let data = useContext(cartContext)
    console.log(data);
    let { addToCart } = data

    // Get route params
    let obj = useParams()
    console.log("useParams", obj); //this is an object
    let { id } = obj

    // ✅ Get current path info
    let location = useLocation()
    //hooks like useLocation() (and all React hooks) must be called at the top level, not inside functions or conditionals.

    

    let [entity, setEntity] = useState({
        entity_name: "",
        restaurant_id: null,
        homechef_id: null
    })

    //Fetching single restaurant/homechef
    async function getRestaurantsData() {
        let res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        let data = res.data.result;

        setCurrentRest(data);

        setEntity({
            entity_name: data.name,
            restaurant_id: id,
            homechef_id: null
        });
    }

    async function getHomechefsData() {
        let res = await axios.get(`http://localhost:5000/api/homechefs/${id}`);
        let data = res.data.result;

        setCurrentRest(data);

        setEntity({
            entity_name: data.name,
            restaurant_id: null,
            homechef_id: id
        });
    }

    /*Use the current URL path to decide which file to fetch.You can detect the current path using useLocation() from React Router.*/
    useEffect(() => {
        if (location.pathname.includes("homechefs")) {
            // Fetch from homechefs.json
            getHomechefsData()
        }
        else {
            // Fetch from restaurants.json
            getRestaurantsData()
        }

    }, [id, location.pathname])

    //LOADING STATE
    if (!currentRest) {
        return <h1 className='text-3xl text-center mt-10 text-gray-500'>Loading menu...</h1>;
    }

    let { name, food_type, menu_items } = currentRest

    //console.log(name,menu_items);
    console.log(currentRest);


    return (
        <main className=' flex flex-col justify-items-start m-5'> {/*border border-solid border-black */}
            {/*<h1>Display menu items of the Restaurant / Homechef</h1> */}
            {/*<h2>Restaurant id is {id}</h2> */}
            <h1 className='text-4xl font-bold font-sans m-2 text-red-700'>{currentRest.name}</h1>
            <p className='text-xl italic font-bold m-2 text-gray-600'>Love, spice, and everything nice 🌶️</p> <hr className='text-red-700' />
            <section className=' flex flex-row gap-10 flex-wrap m-2'> {/*border border-solid border-green-500 */}
                {
                    menu_items.map((value, index) => {
                        //console.log("VALUE ",value.item_id.$oid);
                        return (
                            <div key={index} className=' flex flex-col w-[280px] p-3 bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-105 transition-transform duration-200'> {/*border border-solid border-blue-500 */}
                                <h1 className='m-2 text-2xl font-bold text-red-700'>{value.name}</h1>
                                <h1 className='m-1 italic'>Category : {value.category}</h1>
                                <h1 className='m-1 font-bold'>Price : {value.price}</h1>
                                <h1 className='m-1'>Availability : {value.available == true ? "✅" : "❌"}</h1>
                                <h1 className='m-1'>
                                    {
                                        value.available == true ?
                                            <div className='flex flex-row outline-2 outline-red-800 outline-offset-0 w-[100px] m-1 rounded-2xl font-bold text-red-700 cursor-pointer hover:bg-gray-100 '>
                                                <button className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => addToCart(value, entity)}>
                                                    Add to Cart<FaCartPlus className="text-xl m-1" />
                                                </button>
                                            </div>
                                            : <div className='flex flex-row outline-2 outline-red-800 outline-offset-0 w-[100px] m-1 rounded-2xl font-bold text-red-700 cursor-not-allowed' title='Item unavailable'>
                                                <button className="flex items-center justify-center gap-1 cursor-not-allowed" disabled onClick={() => addToCart(value, entity)}>
                                                    Add to Cart<FaCartPlus className="text-xl m-1" />
                                                </button>
                                            </div>
                                    }

                                </h1>
                            </div>
                        )
                    })
                }
            </section>

            {/*<h1>Displaying address</h1> */}
            <div className='flex items-center gap-1 mt-8 p-2 bg-red-50  rounded-xl shadow-sm'>
                {/*<span className='text-xl text-red-700'>Visit us:</span> */}
                <div className='text-red-700 text-2xl'><IoLocation /> </div>
                <span className='text-red-700 text-lg font-semibold'>{currentRest.location.address},{currentRest.location.city},{currentRest.location.pincode} </span>

            </div>
        </main>

    )
}

export default Menu

/*
Option B – Fetch only one restaurant by ID (recommended now)

This is cleaner.

When you go to /restaurants/:id/menu:

Extract the id using useParams.

Send an API request like GET /restaurants/:id from your backend.

Backend responds with:
{
  "name": "Raghuveer Refreshment",
  "location": { "city": "Nagpur" },
  "menu_items": [ ... ],
  "ratings": 4.9
}
React receives this, stores it in a local state, and maps over menu_items.

That way, each restaurant page is independent — it doesn’t rely on previous pages’ state
*/
/*
Here since I havent learnt backend (Node and Express) I cannot do API request so I again refetched the data because I have used "id" 
*/