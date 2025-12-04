import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { MdDeliveryDining } from "react-icons/md";
import toast from 'react-hot-toast'

const Orders = () => {
    let navigate = useNavigate()
    let [order, setOrder] = useState([])
    let [showPopup, setShowPopup] = useState(false)
    let [selectedDelivery, setSelectedDelivery] = useState(null)

    let { user } = useContext(UserContext)
    let { userid } = user

    async function handleTrackDelivery(orderId) {
        try {
            let response = await axios.get(`http://localhost:5000/api/deliveries/${orderId}`)
            let { success, result } = response.data;

            if (!success) {
                toast.error("No delivery details found!");
                return;
            }

            setSelectedDelivery(result); //This will give a delivery document which contains order_id
            setShowPopup(true);
        } catch (error) {
            toast.error("Error tracking delivery");
        }
    }

    async function findResturantName(id) {
        let k = await axios.get(`http://localhost:5000/api/restaurants/${id}`)
        let { result } = k.data
        return result.name || "Unknown Restaurant"
    }

    async function findHomechefName(id) {
        let k = await axios.get(`http://localhost:5000/api/homechefs/${id}`)
        let { result } = k.data
        return result.name || "Unknown HomeChef"
    }

    async function getOrdersData() {
        let response = await axios.get(`http://localhost:5000/api/orders/${userid}`)
        let { result } = response.data

        // Attach names from API
        const updatedOrders = await Promise.all(
            result.map(async (ord) => {
                let name = ord.restaurant_id
                    ? await findResturantName(ord.restaurant_id)
                    : await findHomechefName(ord.home_chef_id)

                return { ...ord, entity_name: name }
            })
        )

        setOrder(updatedOrders)
    }

    async function handleCancelOrder(orderId) {
        try {
            let orderResponse = await axios.patch(`http://localhost:5000/api/orders/${orderId}`);
            let deliveryResponse = await axios.delete(`http://localhost:5000/api/deliveries/${orderId}`);

            if (orderResponse.data.success) {
                toast.success("Order cancelled successfully");

                // update UI instantly
                setOrder(prev =>
                    prev.map(o => o._id === orderId ? { ...o, status: "cancelled" } : o)
                );

            }
            else {
                toast.error("Order cannot be cancelled");
            }
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        setShowPopup(false); // ALWAYS close popup
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
                                const mongoDateString = value.order_date
                                const dateObject = new Date(mongoDateString)
                                const orderDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
                                const name = value.entity_name


                                return (
                                    <div key={value._id} className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition duration-300">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <h2 className="text-lg font-semibold text-black">
                                                Order #{value._id}
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
                                                    <li key={item.item_id}>
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

                                        {
                                            value.status === "cancelled" ?
                                                <div className="flex justify-end">
                                                    <button disabled
                                                        onClick={() => handleTrackDelivery(value._id)}
                                                        className="bg-grey-500 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-xl hover:bg-grey-600 transition cursor-not-allowed"
                                                    >
                                                        Track Delivery <MdDeliveryDining />
                                                    </button>
                                                </div> :
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleTrackDelivery(value._id)}
                                                        className="bg-amber-500 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-xl hover:bg-amber-600 transition cursor-pointer"
                                                    >
                                                        Track Delivery <MdDeliveryDining />
                                                    </button>
                                                </div>
                                        }
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

                            <h2 className="text-xl font-semibold mb-2">Order ID: {selectedDelivery.order_id}</h2>
                            <p><strong>Delivery Boy:</strong> {selectedDelivery.name}</p>
                            <p><strong>Phone:</strong> {selectedDelivery.phone}</p>
                            <p><strong>Status:</strong> {selectedDelivery.status}</p>
                            <p><strong>Tip:</strong> ₹{selectedDelivery.tip}</p>
                            <p><strong>Rating:</strong> ⭐{selectedDelivery.rating}</p>

                            {
                                selectedDelivery.status === "delivered" ?
                                    <button disabled onClick={() => handleCancelOrder(selectedDelivery.order_id)} className="bg-grey-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-grey-700 cursor-not-allowed">
                                        Cancel Order
                                    </button> :
                                    <button onClick={() => handleCancelOrder(selectedDelivery.order_id)} className="bg-red-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-red-700 cursor-pointer">
                                        Cancel Order
                                    </button>
                            }


                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default Orders
