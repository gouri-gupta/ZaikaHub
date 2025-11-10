import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import { restaurants } from './restaurants.json'
import { homechefs } from './homechefs.json'
import { MdDeliveryDining } from "react-icons/md";
import toast from 'react-hot-toast'

const Orders = () => {

    let [order, setOrder] = useState([])
    let [showPopup, setShowPopup] = useState(false)
    let [selectedDelivery, setSelectedDelivery] = useState(null)

    let { user } = useContext(UserContext)
    let { userid } = user

    async function handleTrackDelivery(orderId) {
        let response = await axios.get("http://localhost:4000/deliveries")
        let { data } = response
        const deli = data.find(d => {
            if (!d || !d.order_id) return false;
            const id = d.order_id.$oid || d.order_id;
            return id === orderId;
        });

        if (!deli) {
            toast.error("No delivery details found for this order");
            return;
        }

        setSelectedDelivery(deli);
        setShowPopup(true);
    }

    function findResturantName(id) {
        let k = restaurants.find((val) => val._id.$oid == id)
        return k?.name || "Unknown Restaurant"
    }

    function findHomechefName(id) {
        let k = homechefs.find((val) => val._id.$oid == id)
        return k?.chef_name || "Unknown HomeChef"
    }

    async function getOrdersData() {
        let response = await axios.get("http://localhost:4000/orders")
        let { data } = response
        let order_curr = data.filter((val) => val.user_id.$oid == userid)
        setOrder(order_curr)
    }

    useEffect(() => {
        getOrdersData()
    }, [userid])


    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[rgb(248,241,230)] flex flex-col items-center p-5">
                <h1 className="text-4xl font-bold text-red-700 mb-6 text-center">Your Orders 🍱</h1>

                {
                    order.length === 0 ? (
                        <h2 className="text-2xl text-gray-600 italic">No orders found yet 😔</h2>
                    ) : (
                        <section className="flex flex-col gap-6 w-full max-w-3xl">
                            {order.map((value) => {
                                const mongoDateString = value.order_date.$date
                                const dateObject = new Date(mongoDateString)
                                const orderDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
                                const name = value.restaurant_id
                                    ? findResturantName(value.restaurant_id.$oid)
                                    : findHomechefName(value.home_chef_id.$oid)

                                return (
                                    <div key={value._id.$oid} className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition duration-300">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <h2 className="text-lg font-semibold text-black">
                                                Order #{value._id.$oid}
                                            </h2>
                                            <span className="text-sm text-gray-500">📅 {orderDate}</span>
                                        </div>

                                        <div className="text-xl font-bold text-red-700">
                                            {name}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-700">Items:</h3>
                                            <ul className="list-disc ml-5 text-gray-600">
                                                {value.items.map((item) => (
                                                    <li key={item.item_id.$oid}>
                                                        {item.name} (x{item.quantity})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center gap-2">
                                            <p className="text-gray-800 font-semibold">💰 Total: ₹{value.total_amount}</p>
                                            <p className={`font-bold ${value.status === 'cancelled' ? 'text-red-600' : 'text-green-600'}`}>
                                                Status: {value.status}
                                            </p>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleTrackDelivery(value._id.$oid)}
                                                className="bg-amber-500 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-xl hover:bg-amber-600 transition cursor-pointer"
                                            >
                                                Track Delivery <MdDeliveryDining />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    )
                }

                
                {showPopup && selectedDelivery && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
                            <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer">✕</button>

                            <h2 className="text-xl font-semibold mb-2">Order ID: {selectedDelivery.order_id.$oid}</h2>
                            <p><strong>Delivery Boy:</strong> {selectedDelivery.name}</p>
                            <p><strong>Phone:</strong> {selectedDelivery.phone}</p>
                            <p><strong>Status:</strong> {selectedDelivery.status}</p>
                            <p><strong>Tip:</strong> ₹{selectedDelivery.tip}</p>
                            <p><strong>Rating:</strong> ⭐{selectedDelivery.rating}</p>

                            <button className="bg-red-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-red-700 cursor-pointer">
                                Cancel Order
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default Orders
