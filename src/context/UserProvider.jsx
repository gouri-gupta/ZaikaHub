import {createContext,useState} from 'react'
import toast from 'react-hot-toast'


//Since multiple pages (Home, Cart, Navbar, Orders) need to know whether a user is logged in —you should create a UserContext.jsx in src/context/
//This makes login info available everywhere — you can display “Welcome Vivek Nair” in Home.jsx or Navbar.jsx.

export let UserContext=createContext()

const UserProvider = ({children}) => {

    let[user,setUser]=useState({
        name:"",
        email:"",
        phone:0,
        userid:"" //It should be same _id
        //useful for future backend calls (like orders by user).userid in your React user state should match that $oid value as a simple string:
    })

    //eg of userobject when a user logs in 
    /*{email: "shruti.joshi18@gmail.com"
    name: "Shruti Joshi"
    phone: 9711223344
    userid: "689f0c6dda1bfb28f3eec4ba"}
    */

    let [isLoggedIn,setLog]=useState(false) //shows Whether the user is logged in or not

    //loginUser() → updates the context with the logged-in user’s info.
    function loginUser(userObj){
        //will set the user state if the user details is found  i.e user details exists in database
        setUser({name:userObj.name,email:userObj.email,phone:userObj.phone,userid:userObj._id})
        setLog(true)
    }

    //logoutUser() → clears the user info and marks them as logged out.
    function logoutUser(){
        setUser({name:"",email:"",phone:0,userid:""})
        setLog(false)
        toast.success("Logged out successfully")
    }


    return (
        <UserContext.Provider value={{user,isLoggedIn,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
