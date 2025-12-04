import { useState, useEffect, Fragment } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast from "react-hot-toast";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { BiFoodTag } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";

const Restaurants = () => {

    let [restaurant, setRestaurant] = useState([])
    let [city, setCity] = useState([]) //contain the list of unique cities
    let [selectedCity, setSelectedCity] = useState("None")
    let [cuisine, setCuisine] = useState([])
    let [selectedCuisine, setSelectedCuisine] = useState("None")
    let [selectedSort, setSelectedSort] = useState("None")
    let [showVegOnly, setShowVegOnly] = useState(false)

    let navigate = useNavigate()

    async function getData() {
        try {
            let response = await axios.get("http://localhost:5000/api/restaurants");
            console.log(response.data);
            setRestaurant(response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to load restaurants");
        }
    }

    function findCity() {
        //to find out how many citie's restaurants are found in the data base
        //city array will contain the list of unique cities
        let c = new Set([])
        restaurant.map((value, index) => {
            c.add(value.location.city)
        })
        //console.log(c);
        let arr = Array.from(c)
        console.log(arr);
        arr.sort()
        setCity(arr)
    }

    useEffect(() => {
        getData()

    }, [])

    function findCuisine() {
        //to find out the cuisines
        let s = new Set([])
        restaurant.map((value, index) => {
            value.cuisine_type.forEach((val) => s.add(val))
        })
        console.log(s);
        let arr = Array.from(s)
        arr.sort()
        setCuisine(arr)
    }

    useEffect(() => {
        findCity()
        findCuisine()
        //This useEffect will get invoked every time restaurant changes
        //if there is a restaurant offering some new cuisine then that also gets added in cuisine list
    }, [restaurant]) //Once restaurant changes, this hook runs automatically.Inside it, you call findCity().We are using Set to collect unique city names

    let handleCityChange = (e) => {
        //console.log(e.target.value);
        setSelectedCity(e.target.value)
    }

    let handleCuisineChange = (e) => {
        setSelectedCuisine(e.target.value)
    }

    let handleSort = (e) => {
        setSelectedSort(e.target.value)
    }

    let handleMenu = (x) => {
        //x is the id of the restaurants to be displayed
        //navigator(`/restaurants/${x}/menu`)
        let path = "/restaurants/" + x + "/menu"
        navigate(path)
    }

    let filteredRestaurants = restaurant
    if (selectedCity != "None") {
        filteredRestaurants = filteredRestaurants.filter((value) => value.location.city == selectedCity)
    }
    //console.log(filteredRestaurants);
    if (selectedCuisine != "None") {
        filteredRestaurants = filteredRestaurants.filter((value) => value.cuisine_type.includes(selectedCuisine))
    }

    if (selectedSort === "ascending") {
        filteredRestaurants.sort((a, b) => a.ratings - b.ratings)
    }
    if (selectedSort === "descending") {
        filteredRestaurants.sort((a, b) => b.ratings - a.ratings)
    }

    //pure veg options
    if (showVegOnly === true) {
        filteredRestaurants = filteredRestaurants.filter(item => item.food_type === "veg")
    }

    console.log(filteredRestaurants);





    return (
        <>
            <Navbar></Navbar>
            <section className='flex flex-row justify-between  m-2 bg-[rgb(248,241,230)] p-3 
                    sticky top-0 z-20 shadow-md rounded-lg flex-wrap gap-3'> {/*border border-solid border-black */}
                <section className='flex flex-col gap-1 m-2'>
                    <h1 className='text-xl font-bold text-red-700 font-sans'>Filter by city</h1>
                    <select name="selectedCity" id="" onChange={handleCityChange} className='border-red-700'>
                        <option value="None" className=''>None</option>
                        {
                            city.map((cvalue, index) => {
                                return (
                                    <Fragment key={index}>
                                        <option value={cvalue}>{cvalue}</option>
                                    </Fragment>
                                )
                            })
                        }
                    </select>
                </section>
                <section className='flex flex-col gap-1 m-2'>
                    <h1 className='text-xl font-bold text-red-700 font-sans'>Filter by cuisine</h1>
                    <select name="cuisine" id="" className='border-black' onChange={handleCuisineChange}>
                        <option value="None">None</option>
                        {
                            cuisine.map((cuisine, index) => {
                                return (
                                    <Fragment key={index}>
                                        <option value={cuisine}>{cuisine}</option>
                                    </Fragment>
                                )
                            })
                        }
                    </select>
                </section>
                <section className='flex flex-col  m-2'>
                    <h1 className='text-xl font-bold text-red-700 font-sans'>Sort by ratings</h1>
                    {/*Instead add a top and down arrow to show all the restauarnts rating wise */}
                    <section className='flex flex-row justify-center gap-2'>
                        <button onClick={() => setSelectedSort("descending")} title='Highest to Lowest' className='text-xl'><FaArrowUpLong /></button> {/*Highest to Lowest ratings */}
                        <button onClick={() => setSelectedSort("ascending")} title='Lowest to Highest' className='text-xl'><FaArrowDownLong /></button> {/*Lowest to Highest ratings */}
                        {/*For <button> elements, e.target.value doesn’t exist by default like it does for <input> or <select> */}
                    </section>
                </section>
                {/*Pure veg options */}
                <section className="flex items-center gap-2 m-2">
                    <span className='text-xl font-extrabold text-red-700 font-sans'>Non-Veg</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={showVegOnly} onChange={() => setShowVegOnly(!showVegOnly)} />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition-all"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-6 transition-all"></div>
                    </label>
                    <span className='text-xl font-extrabold text-green-700 font-sans'>Veg</span>
                </section>
            </section>
            <section>
                {
                    selectedCity == "None" && selectedCuisine == "None" && showVegOnly === false ? city.map((value, index) => {
                        return (
                            <div key={index} className=' m-5 flex flex-col gap-5 justify-items-start'> {/* border border-solid border-black */}
                                <h1 className='text-4xl m-1 italic text-red-700 font-sans'>Trending restaurants in {value} ...</h1> <hr className='text-red-700' />
                                <main className=' m-2 flex flex-row gap-10 flex-wrap '> {/*border border-solid border-green-500 */}
                                    {
                                        restaurant.filter(item => item.location.city == value).map((rvalue, index) => {
                                            return (
                                                <div key={rvalue._id} className=' flex flex-col w-[300px] p-3 bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-105 transition-transform duration-300'> {/*border border-solid border-sky-500 */}
                                                    <h1 className='m-2 text-2xl font-bold text-red-700'>{rvalue.name}</h1>
                                                    <h1 className='m-1 '>Cuisine types: {rvalue.cuisine_type.join(" | ")}</h1>
                                                    <div className='flex items-center gap-1 m-1'>
                                                        <span>Food type : </span>
                                                        {
                                                            rvalue.food_type === "veg" && <div className='text-green-600 text-2xl '><BiFoodTag /></div>
                                                        }
                                                        {
                                                            rvalue.food_type === "non-veg" && <div className='text-red-600 text-2xl'><BiFoodTag /></div>
                                                        }
                                                        {
                                                            rvalue.food_type === "mixed" &&
                                                            (<div className="flex gap-1">
                                                                <div className='text-green-600 text-2xl'><BiFoodTag /></div>
                                                                <div className='text-red-600 text-2xl'><BiFoodTag /></div>
                                                            </div>)
                                                        }
                                                    </div>
                                                    <h1 className='m-1'>Ratings : {rvalue.ratings}</h1>
                                                    <div className='flex flex-row outline-2 outline-red-800 outline-offset-0 w-[100px] m-2 rounded-2xl font-bold text-red-700 cursor-pointer hover:bg-gray-100 '>
                                                        <button className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => handleMenu(rvalue._id)}>View Menu <MdRestaurantMenu className="text-lg" /></button></div> {/* <MdRestaurantMenu /> */}
                                                    {/*border border-solid border-black */}
                                                </div>
                                            )
                                        })
                                    }
                                </main>
                            </div>
                        )
                    })
                        : (
                            <main className=' flex flex-row gap-10 flex-wrap m-5'> {/*border border-solid border-green-500 */}
                                {
                                    filteredRestaurants.map((value, index) => {
                                        return (
                                            <div key={value._id} className=' flex flex-col w-[300px] p-3 bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-105 transition-transform duration-300'> {/* border border-solid border-sky-500 */}
                                                <h1 className='m-2 text-2xl font-bold text-red-700'> {value.name}</h1>
                                                {/*<h1 className='m-1 '> <IoLocation />{value.location.address},{value.location.city}</h1> */}
                                                <div className='flex items-center gap-1 m-1'>
                                                    <div className='text-red-700 text-xl'><IoLocation /></div>
                                                    <span>{value.location.address},{value.location.city}</span>
                                                </div>
                                                <h1 className='m-1 '>Cuisine Type : {value.cuisine_type.join(" | ")} </h1>
                                                {/* <h1 >Food type : {value.food_type}</h1> */}
                                                <div className='flex items-center gap-1 m-1'>
                                                    <span>Food type : </span>
                                                    {
                                                        value.food_type === "veg" && <div className='text-green-600 text-2xl '><BiFoodTag /></div>
                                                    }
                                                    {
                                                        value.food_type === "non-veg" && <div className='text-red-600 text-2xl'><BiFoodTag /></div>
                                                    }
                                                    {
                                                        value.food_type === "mixed" &&
                                                        (<div className="flex gap-1">
                                                            <div className='text-green-600 text-2xl'><BiFoodTag /></div>
                                                            <div className='text-red-600 text-2xl'><BiFoodTag /></div>
                                                        </div>)
                                                    }
                                                </div>
                                                <h1 className='m-1 '>Ratings : {value.ratings}</h1>
                                                <div className='flex flex-row outline-2 outline-red-800 outline-offset-0 w-[100px] m-2 rounded-2xl font-bold text-red-700 cursor-pointer hover:bg-gray-100 '><button className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => handleMenu(value._id)}>View Menu <MdRestaurantMenu className="text-lg" /></button></div>
                                            </div>
                                        )
                                    })
                                }
                            </main>
                        )
                }
            </section>
            <Outlet></Outlet>
        </>
    )
}

export default Restaurants

/*
Since restaurants.json is a mongo db database ,it contains _id i.e a unique ID for each document
When you fetch it via Axios in React, you’re seeing an extra field "id" like id: "969a"
That’s because when you fetch MongoDB data (through your Express API, likely using mongoose),
Mongoose automatically creates a virtual id field that’s a string version of _id
So both _id and id can exist — they refer to the same unique restaurant.
This is completely normal and safe to use in React.
*/