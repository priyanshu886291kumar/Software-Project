// src/pages/SubscriptionPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// A simple Spinner component for the loading state
const Spinner = () => (
  <svg
    className="w-6 h-6 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);

function SubscriptionPage() {
  const navigate = useNavigate();

  // State for payment form fields
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // State for validation error messages
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    zipCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function for numeric fields (only digits allowed)
  const validateNumeric = (name: string, value: string, maxLength: number) => {
    let errorMsg = "";
    if (!/^\d*$/.test(value)) {
      errorMsg = "Only numbers allowed";
    } else if (value.length > maxLength) {
      errorMsg = `Maximum ${maxLength} digits allowed`;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Handle input change and perform real-time validation for numeric fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "cardNumber") {
      validateNumeric(name, value, 16);
    }
    if (name === "cvc") {
      validateNumeric(name, value, 3);
    }
    if (name === "zipCode") {
      validateNumeric(name, value, 10);
    }
    if (name === "expiryDate") {
      if (!/^[\d/]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, expiryDate: "Format should be MM/YY" }));
      } else if (value.length > 5) {
        setErrors((prev) => ({ ...prev, expiryDate: "Maximum 5 characters allowed" }));
      } else {
        setErrors((prev) => ({ ...prev, expiryDate: "" }));
      }
    }
  };

  // Handle form submission and integrate Razorpay checkout
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final check for validation errors
    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) {
      alert("Please fix the errors in the form.");
      return;
    }
    setIsSubmitting(true);
    try {
      // For demonstration, assume the subscription amount is ₹9.99.
      // Convert amount to paise (₹9.99 = 999 paise)
      const amount = 999;
      // Call backend to create a Razorpay checkout session
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // You may want to send additional form data if needed
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Checkout session creation failed.");
      }
      // Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || "your_razorpay_key", // Replace with your Razorpay API key
        amount: data.amount,
        currency: data.currency,
        name: "Emotion Music Premium",
        description: "Upgrade to Premium",
        order_id: data.id, // Order ID from Razorpay
        handler: function (response: any) {
          // Payment success callback
          alert("Subscription successful!");
          navigate("/");
        },
        prefill: {
          name: formData.nameOnCard,
          email: "user@example.com", // Optionally get user email from auth
          contact: "", // Optionally add contact number
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#F97316", // Using your theme color (orange) for the Razorpay modal
        },
      };
      // Create Razorpay checkout instance and open it
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error in subscription:", error);
      alert("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-backgroundLight text-indigo-800 dark:text-indigo-900 py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 text-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Upgrade Your Plan
          </h1>
          <p className="mb-8 text-gray-300">
            Emotion-Based Music Recommendation System Premium
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Plan Summary – Unchanged */}
            <div className="bg-emerald-50 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold mb-3 text-indigo-800">
                Your Plan
              </h2>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-800">
                    Spotify Premium
                  </span>
                  <span className="text-indigo-800">$9.99/month</span>
                </div>
                <p className="text-sm mt-1 text-gray-700">Billed monthly</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-indigo-800">Total due today</span>
                <span className="text-2xl font-bold text-indigo-800">$9.99</span>
              </div>
              <div className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">
                Add promo code
              </div>
            </div>

            {/* Right Column: Payment Form with Validation */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1 text-indigo-800">
                  Billing Frequency
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="monthly" name="billing" defaultChecked />
                    <label htmlFor="monthly" className="text-indigo-800">
                      Monthly $9.99/month
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="yearly" name="billing" />
                    <label htmlFor="yearly" className="text-indigo-800">
                      Yearly
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-indigo-800">
                  Payment Method
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="credit" name="payment" defaultChecked />
                    <label htmlFor="credit" className="text-indigo-800">
                      Credit or Debit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="paypal" name="payment" />
                    <label htmlFor="paypal" className="text-indigo-800">
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="apple" name="payment" />
                    <label htmlFor="apple" className="text-indigo-800">
                      Apple Pay
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Information Fields with validation messages */}
              <div>
                <label className="block font-medium mb-1 text-indigo-800">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  required
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    CVC *
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                  {errors.cvc && (
                    <p className="text-red-500 text-sm">{errors.cvc}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-indigo-800">
                  Name on Card *
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-indigo-800">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, Apt, Suite, Building"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    State/Province/Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">{errors.zipCode}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1 text-indigo-800">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent text-white font-semibold rounded hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SubscriptionPage;
