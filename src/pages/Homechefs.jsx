import { useState, useEffect, Fragment } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import toast from "react-hot-toast";
import axios from 'axios'
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { BiFoodTag } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
const API = import.meta.env.VITE_API_BASE_URL;

const Homechefs = () => {

    let [homechef, setHomechef] = useState([])
    let [city, setCity] = useState([])
    let [selectedCity, setSelectedCity] = useState("None")
    let [cuisine, setCuisine] = useState([])
    let [selectedCuisine, setSelectedCuisine] = useState("None")
    let [selectedSort, setSelectedSort] = useState("None")
    let [showVegOnly, setShowVegOnly] = useState(false)

    async function getData() {
        try {
            let response = await axios.get(`${API}/api/homechefs`);
            console.log(response.data);
            setHomechef(response.data || response.data.result);  //// backend returns {result:[]} or [] ?
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to load Homechefs");
        }
    }

    function findCity() {
        //to find out how many citie's homechefs are found in the data base
        //city array will contain the list of unique cities
        let c = new Set([])
        homechef.map((value, index) => {
            c.add(value.location.city)
        })
        //console.log(c);
        let arr = Array.from(c)
        console.log(arr);
        arr.sort()
        setCity(arr)
    }

    function findCuisine() {
        //to find out the unique cuisines
        let s = new Set([])
        homechef.map((value, index) => {
            value.cuisine_type.forEach((val) => s.add(val))
        })
        console.log(s);
        let arr = Array.from(s)
        arr.sort()
        setCuisine(arr)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        findCity()
        findCuisine()
        //This useEffect will get invoked every time homechef changes
        //if there is a homechef offering some new cuisine then that also gets added in cuisine list
    }, [homechef]) //Once homechef changes, this hook runs automatically.Inside it, you call findCity().We are using Set to collect unique city names and also using Set to collect unique cuisine names

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

    //navigator to menu and handle Menu is left

    let filteredHomechefs = homechef
    if (selectedCity != "None") {
        filteredHomechefs = filteredHomechefs.filter((value) => value.location.city == selectedCity)
    }
    //console.log(filteredRestaurants);
    if (selectedCuisine != "None") {
        filteredHomechefs = filteredHomechefs.filter((value) => value.cuisine_type.includes(selectedCuisine))
    }

    if (selectedSort === "ascending") {
        filteredHomechefs.sort((a, b) => a.rating - b.rating)
    }
    if (selectedSort === "descending") {
        filteredHomechefs.sort((a, b) => b.rating - a.rating)
    }

    //pure veg options
    if (showVegOnly === true) {
        filteredHomechefs = filteredHomechefs.filter(item => item.food_type === "veg")
    }

    console.log(filteredHomechefs);

    let navigate = useNavigate()

    let handleMenu = (x) => {
        //x is the id of the restaurants to be displayed
        //navigator(`/restaurants/${x}/menu`)
        let path = "/homechefs/" + x + "/menu"
        navigate(path)
    }

    return (
        <>
            <Navbar></Navbar>
            <section className='flex flex-row justify-between  m-2 bg-[rgb(248,241,230)] p-3 
                    sticky top-0 z-20 shadow-md rounded-lg flex-wrap gap-3'>
                <section className='flex flex-col gap-1 m-2'>
                    <h1 className='text-xl font-bold text-red-700 font-sans'>Filter by city</h1>
                    <select name="selectedCity" id="" onChange={handleCityChange} className='border-black'>
                        <option value="None">None</option>
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
            {/*<h1>Home chefs</h1>*/}
            <section>
                {
                    selectedCity == "None" && selectedCuisine == "None" && showVegOnly === false ? city.map((value, index) => {
                        return (
                            <div key={index} className=' m-5 flex flex-col gap-5 justify-items-start'>
                                <h1 className='text-4xl m-1 italic text-red-700 font-sans'>Home-Cooked Delights in {value}</h1> <hr className='text-red-700'  />
                                <main className=' m-2 flex flex-row gap-10 flex-wrap '>
                                    {
                                        homechef.filter(item => item.location.city == value).map((rvalue, index) => {  //rvalue=homechef object
                                            return (
                                                <div key={rvalue._id} className=' flex flex-col w-[300px] p-3 bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-105 transition-transform duration-300'>
                                                    <h1 className='m-2 text-2xl font-bold text-red-700'>{rvalue.name}</h1>
                                                    <h1 className='m-1 '>Cuisine types: {rvalue.cuisine_type.join(" | ")}</h1>
                                                    <h1 className='m-1 '>Speciality : {rvalue.speciality}</h1>
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
                                                    <h1 className='m-1'>Ratings : {rvalue.rating}</h1>
                                                    <div className='flex flex-row outline-2 outline-red-800 outline-offset-0 w-[100px] m-2 rounded-2xl font-bold text-red-700 cursor-pointer hover:bg-gray-100 '><button className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => handleMenu(rvalue._id)}>View Menu <MdRestaurantMenu className="text-lg" /></button></div> {/* <MdRestaurantMenu /> */}
                                                </div>
                                            )
                                        })
                                    }
                                </main>
                            </div>
                        )
                    })
                        :
                            (
                                <main className=' flex flex-row gap-10 flex-wrap m-5'>
                                    {
                                        filteredHomechefs.map((value, index) => {
                                            return (
                                                <div key={value._id} className=' flex flex-col w-[300px] p-3 bg-white rounded-3xl text-gray-600 font-sans shadow-lg hover:scale-105 transition-transform duration-300'>
                                                    <h1 className='m-2 text-2xl font-bold text-red-700'>{value.name}</h1>
                                                    <div className='flex items-center gap-1 m-1'>
                                                        <div className='text-red-700 text-xl'><IoLocation /></div>
                                                        <span>{value.location.address},{value.location.city}</span>
                                                    </div>
                                                    <h1 className='m-1 '>Cuisine Type : {value.cuisine_type.join(" | ")} </h1>
                                                    <h1 className='m-1 '>Speciality : {value.speciality}</h1>
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
                                                    <h1 className='m-1 '>Ratings : {value.rating}</h1>
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

export default Homechefs
