import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckoutForm from "@/components/CheckoutForm";
// Initialize Stripe with your Publishable Key
const stripePromise = loadStripe("pk_live_51MxL10AxiAiP83VXYINCN4TzswI4MHZqC8dzy8XzkHP4aKiySGDaFzOhmgAtBacFqSpyvxh9JIKegYpPdLG52hzo00OjVoDeU5");

export default function addtocart({ cartItems, handleRemoveFromCart }) {

    useEffect(() => {
        console.log("Cart Items:", cartItems);
        if (Array.isArray(cartItems)){
            cartItems.forEach((item) => console.log("Item Details:", item));
        }
      else{
        console.warn("cartItems is not an array or is undefined:", cartItems);
      }
    }, [cartItems]);

    // Safely parse price strings
    const parsePrice = (priceString) => {
        if (typeof priceString !== "string" || !priceString) {
            console.warn("Invalid price format:", priceString);
            return 0;
        }
        return parseFloat(priceString.replace(/[$,]/g, ""));
    };


    const totalPrice = (cartItems || []).reduce((total, item) => {
        if (!item.price || isNaN(parsePrice(item.price))) {
            console.warn("Invalid item price detected:", item);
            return total;
        }
        const itemPrice = parsePrice(item.price);
        return total + itemPrice * item.quantity;
    }, 0);

    const totalQuantity = (cartItems || []).reduce((total, item) => total + item.quantity, 0);
    const tax = totalPrice * 0.06;
    const totalAmount = totalPrice + tax;
    const isCartEmpty = !cartItems || cartItems.length === 0;
    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h1>
                    WELCOME TO <span style={{ color: "#1eb7c6" }}>YOUR CART</span>
                </h1>
                <div
                    className="d-inline-block rounded-pill my-3 heading-divider"
                    style={{ height: "10px", width: "90px", border: "2px solid #1eb7c6" }}
                ></div>
            </div>

            <div className="row">
                {/* Left Column */}
                <div className="col-lg-8 col-md-7">
                    
                    {isCartEmpty ? (
                        <div className="text-center">
                            <h2>Your Cart is empty now.</h2>
                            <p>Browse products and add them to your cart to get started!</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="card mb-3">
                                <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <img
                                        src={item.imageURL || "https://via.placeholder.com/80"} // Placeholder image if imageURL is not provided
                                        alt={item.name}
                                        className="mb-3 mb-md-0 ml-md-3 "
                                        id="cart-img-1"
                                        style={{ width: "230px", height: "190px" }}
                                    />
                                    <div className="flex-grow-1 cart-detail">
                                        <h5 className="card-title fw-bold ">{item.name}</h5>
                                        <p className="card-text">Variant : {item.variant}</p>
                                        <p className="card-text">Stock : {item.stockNumber}</p>
                                        <p className="card-text">Price : {item.price}</p>
                                        <p className="card-text">Quantity : {item.quantity}</p>
                                        <div className="d-flex justify-content-between">

                                            <button
                                                className="btn btn-outline-danger mt-2"
                                                onClick={() => handleRemoveFromCart(item.stockNumber)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Column */}
                <div className="col-lg-4 col-md-5">
                    <div className="border p-3 bg-white rounded">
                        <h3 className="text-center">Your Items Detail</h3>
                        <div className="my-3">
                            <div className="d-flex justify-content-between">
                                <p>Products</p>
                                <p>{totalQuantity}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>SubTotal</p>
                                <p>$ {totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Tax (6%)</p>
                                <p>$ {tax.toFixed(2)}</p>
                            </div>
                            <div className="d-flex justify-content-between border-top border-info pt-3">
                                <p>Total Amount</p>
                                <p>$ {totalAmount.toFixed(2)}</p>
                            </div>

                            {/* PayPal Integration */}
                            <PayPalScriptProvider options={{ "client-id": "AepuhUj9dLNS71lknDmEVYzoOD9GNHjTn5Y23jCbcatvC37wwz5gRtxCVTH7xKZZ0APHCi51d7oUKX9l" }}>
                                <h4 className="mt-4">Pay with PayPal</h4>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{ amount: { value: totalAmount.toFixed(2) } }],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            alert(`Transaction completed by ${details.payer.name.given_name}`);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal Error:", err);
                                        alert("An error occurred with PayPal.");
                                    }}
                                />
                            </PayPalScriptProvider>

                            {/* Stripe Integration */}
                            <Elements stripe={stripePromise}>
                                <h4 className="mt-4">Pay with Card</h4>
                                <CheckoutForm amount={totalAmount.toFixed(2)} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}