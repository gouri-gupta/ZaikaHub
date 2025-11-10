import { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';


const Signup = () => {

    let navigate = useNavigate()

    let d = useContext(UserContext)
    //console.log(d);
    let { user, isLoggedIn, loginUser, logoutUser } = d

    let [currUser, setCurrUser] = useState({
        _id: { $oid: uuidv4() },
        name: "",
        email: "",
        phone: "",
        address: {
            street: "",
            city: "",
            pincode: ""
        },
        join_date: {
            $date: new Date().toISOString()
        }
    })

    let { name, email, phone, address: { street, city, pincode } } = currUser
    //let {street,city,pincode}=currUser
    //console.log(street);

    let handleChange = (e) => {
        let { name, value } = e.target;
        // Check if the field belongs to address
        if (["street", "city", "pincode"].includes(name)) {
            setCurrUser({ ...currUser, address: { ...currUser.address, [name]: value } });  //BE careful for nested object like address
        }
        else {
            setCurrUser({ ...currUser, [name]: value });
        }
    };

    async function sendData(obj) {
        try {
            await axios.post("http://localhost:4000/users", obj);
            return true; // success
        } catch (error) {
            console.error("Error sending data:", error);
            return false;
        }
    }


    let [errors, setErrors] = useState({})
    let handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {}

        let flag = true; //initially we assume there is no error

        //form validation
        //we will generate error ONLY when the user enters invalid data

        //name
        if (name === "") {
            validationErrors.name = "*This field is mandatory"
            flag = false
        }

        //email
        let regexEmail = /\S+@\S+\.\S+/
        //regex.test(string) 
        if (email == "") {
            validationErrors.email = "*This field is mandatory"
            flag = false
        }
        else if (!regexEmail.test(email)) {
            validationErrors.email = "This should be an email"
            flag = false
        }

        //phone
        let regexPhone = /^(\+91[-\s]?)?[0]?(91)?[6-9]\d{9}$/;
        if (phone.trim() == "") {
            validationErrors.phone = "*This field is mandatory"
            flag = false
        }
        else if (!regexPhone.test(phone)) {
            validationErrors.phone = "This should be a valid mobile number"
            flag = false
        }

        //street
        if (street == "") {
            validationErrors.street = "*This field is mandatory"
            flag = false
        }

        //city
        if (city == "") {
            validationErrors.city = "*This field is mandatory"
            flag = false
        }

        //pincode
        let regexPincode = /^[1-9][0-9]{2}\s?[0-9]{3}$/;
        if (pincode.trim() == "") {
            validationErrors.pincode = "*This field is mandatory"
            flag = false
        }
        else if (!regexPincode.test(pincode)) {
            validationErrors.pincode = "This should be a valid pincode"
            flag = false
        }

        setErrors(validationErrors)

        if (flag == true) {

            //before sending the data to the server we need to convert phone and pincode to Number as these are strings
            const userToSend = {
                ...currUser,
                phone: Number(currUser.phone),
                address: {
                    ...currUser.address,
                    pincode: Number(currUser.address.pincode)
                }
            };
            console.log(userToSend);

            //NOW
            //send the data to the server using axios.post
            //raise a toast ->Signed in successfully   "Profile created successfully ✅"
            //call loginUser to set the user as the current user
            //navigate to the Home page  to display "Welcome to Zaika Hub User"

            const success = await sendData(userToSend);
            if (success) {
                toast.success("Profile created successfully");
                loginUser(userToSend);
                navigate('/');
            }
            else {
                toast.error("Something went wrong while creating your profile!");
            }
        }
        else {
            toast.error("Signup failed! Check your inputs and try again.")
        }
    }



    return (
        <main className=' flex flex-col items-center m-5 gap-2'> {/*border border-solid border-black */}
            <section className=' flex flex-row justify-center items-center mb-5'> {/*border border-solid border-rose-500 */}
                <h1 className='font-sans text-8xl font-bold text-red-600'>Zaika</h1>
                <h1 className='font-sans text-8xl font-bold text-yellow-400'>Hub</h1>
                <img src={logo} alt="" className='h-20 ml-3' />
            </section>
            <h1 className='text-4xl font-bold text-red-700'>Create Your ZaikaHub Account 🍲</h1>
            <p className='text-2xl italic text-gray-600 font-sans'>Join us to explore homely tastes & trending restaurants!</p>
            <section className='w-[400px]'>
                <section className='w-full flex flex-col '> {/*border border-solid border-amber-600 */}
                    <form action="" onSubmit={handleSubmit} className="form-group flex flex-col gap-4 text-xl font-bold text-red-700">
                        <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                            <label >Name </label>
                            <input type="text" placeholder='Enter username' name='name' value={name} onChange={handleChange} title='This will be your username' className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                            {/* <p className=''>(This will be treated as you username) </p> */}
                            <div className='form-error text-red-600 text-sm'>
                                {errors.name && <span>{errors.name}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                            </div>
                        </div>

                        <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                            <label>Email</label>
                            <input type="text" placeholder='Enter email' name='email' value={email} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                            <div className='form-error text-red-600 text-sm'>
                                {errors.email && <span>{errors.email}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                            </div>
                        </div>

                        <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                            <label>Phone</label>
                            <input type="text" placeholder='Enter mobile number' name='phone' value={phone} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                            <div className='form-error text-red-600 text-sm'>
                                {errors.phone && <span>{errors.phone}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                            </div>
                        </div>

                        <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                            <label>Address details</label>

                            <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                                <label >Street</label>
                                <input type="text" placeholder='Enter street' name='street' value={street} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                                <div className='form-error text-red-600 text-sm'>
                                    {errors.street && <span>{errors.street}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                                </div>
                            </div>

                            <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                                <label>City</label>
                                <input type="text" placeholder='Enter city' name='city' value={city} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                                <div className='form-error text-red-600 text-sm'>
                                    {errors.city && <span>{errors.city}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                                </div>
                            </div >

                            <div className='flex flex-col  gap-2'> {/*border border-solid border-green-500 */}
                                <label>Pincode</label>
                                <input type="text" placeholder='Enter pincode' name='pincode' value={pincode} onChange={handleChange} className='w-full font-normal italic text-gray-500 border border-solid border-red-700 rounded-lg bg-white p-2' />
                                <div className='form-error text-red-600 text-sm'>
                                    {errors.pincode && <span>{errors.pincode}</span>}  {/*Using short circuiting -it will display error only when there is an error */}
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-center'> {/*border border-solid border-green-500 */}
                            <button className='flex items-center justify-center outline-2 outline-red-800 outline-offset-0 rounded-2xl font-bold text-red-700 p-2 cursor-pointer hover:bg-gray-100 hover:scale-105'>Sign up</button>
                        </div>
                    </form>
                </section>
            </section>
            <p className='text-xl  text-gray-600 font-sans'>Already have an account? <Link to='/login' >Log in</Link></p>
        </main>
    )
}

export default Signup

