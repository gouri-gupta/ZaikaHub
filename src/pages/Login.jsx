import { useEffect, useContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import toast from 'react-hot-toast'
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';


//DO THE FORM VALIDATION ALSO

const Login = () => {

    let navigate = useNavigate()

    let d = useContext(UserContext)
    //console.log(d);
    let { user, isLoggedIn, loginUser, logoutUser } = d

    let [currUser, setCurrUser] = useState({
        curr_name: "",
        curr_email: "",
        curr_phone: ""
    })

    let [allUsers, setAllUsers] = useState([])

    let { curr_name, curr_email, curr_phone } = currUser


    async function getUsersData() {
        let a = await axios.get("http://localhost:4000/users")
        console.log(a);
        let { data } = a
        let allusers = data
        console.log(allusers);
        setAllUsers(allusers)
    }

    useEffect(() => {
        getUsersData()
    }, [])

    let handleChange = (e) => {
        let { name, value } = e.target
        setCurrUser({ ...currUser, [name]: value })
        //Even though the input type="tel" looks like a number, HTML inputs always return a string in e.target.value
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        //on click of log in button whether user exists in the database or not i.e //checks whether the user exists or not
        let userObj = allUsers.find((val) => (curr_name === val.name && curr_email === val.email) || (curr_name === val.name && Number(curr_phone) === val.phone))
        console.log(userObj);
        //If the user does not exists in the database then userObj must be undefined OTHERWISE it must have some value
        if (typeof userObj === "undefined") {
            toast.error("Login failed")
        }
        else {
            loginUser(userObj)
            navigate('/') //now display marquee here displaying the name of the user (eg WELCOME XYZ) OTHERWISE ONLY DISPLAY "Welcome to ZaikaHub"
            toast.success(`Welcome back ${userObj.name}!`)
        }
    }



    return (
        <main className=' flex flex-col items-center m-5 gap-2 '> {/*border border-solid border-black */}
            <section className=' flex flex-row justify-center items-center mb-5'> {/*border border-solid border-rose-500 */}
                <h1 className='font-sans text-8xl font-bold text-red-600'>Zaika</h1>
                <h1 className='font-sans text-8xl font-bold text-yellow-400'>Hub</h1>
                <img src={logo} alt="" className='h-20 ml-3' />
            </section>
            <h1 className='text-4xl font-bold text-red-700'>Welcome Back, Foodie! 🍕</h1>
            <p className='text-2xl italic text-gray-600 font-sans'>Log in to continue your delicious journey.</p>
            <section className='w-[400px]'>
                <section className='w-full flex flex-col '> {/*border border-solid border-amber-700 */}
                    <form action="" onSubmit={handleSubmit} className="form-group flex flex-col gap-4 text-xl font-bold text-red-700">
                        <div className='flex flex-col  gap-2'>
                            <label>Username</label> {/*Username same as name */}
                            <input type="text" placeholder='Enter name' name='curr_name' value={curr_name} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                        </div>

                        <div className='flex flex-col  gap-2'>
                            <label>Log in by email</label>
                            <input type="text" placeholder='Enter email' name='curr_email' value={curr_email} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2'/>
                        </div>

                        <div className='flex flex-col  gap-2'>
                            <label>Log in by mobile number</label>
                            <input type="text" placeholder='Enter mobile number' name='curr_phone' value={curr_phone} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2'/>
                        </div>

                        <div className='flex justify-center'>
                            <button className='flex items-center justify-center outline-2 outline-red-800 outline-offset-0 rounded-2xl font-bold text-red-700 p-2 cursor-pointer hover:bg-gray-100 hover:scale-105'>Log in</button>
                        </div>
                    </form>
                </section>
            </section>
            <p className='text-xl  text-gray-600 font-sans'>Don't have an account? <Link to='/signup' >Sign up</Link></p>
        </main>
    )
}

export default Login
