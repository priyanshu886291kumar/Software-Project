// src/pages/SubscriptionPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SubscriptionPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle subscription logic, e.g., POST to backend
    alert("Subscription successful!");
    // Possibly navigate away or show a success message
    navigate("/");
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
            {/* Left Column: Plan Summary */}
            <div className="bg-emerald-50 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold mb-3 text-blue-700">
                Your Plan
              </h2>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-700">
                    Spotify Premium
                  </span>
                  <span className="text-blue-700">$9.99/month</span>
                </div>
                <p className="text-sm mt-1 text-gray-700">Billed monthly</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-700">Total due today</span>
                <span className="text-2xl font-bold text-blue-700">$9.99</span>
              </div>
              <div className="mt-3 text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                Add promo code
              </div>
            </div>

            {/* Right Column: Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1 text-blue-300">
                  Billing Frequency
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="monthly" name="billing" defaultChecked />
                    <label htmlFor="monthly" className="text-blue-300">
                      Monthly $9.99/month
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="yearly" name="billing" />
                    <label htmlFor="yearly" className="text-blue-300">
                      Yearly
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-blue-300">
                  Payment Method
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="credit" name="payment" defaultChecked />
                    <label htmlFor="credit" className="text-blue-300">
                      Credit or Debit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="paypal" name="payment" />
                    <label htmlFor="paypal" className="text-blue-300">
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="apple" name="payment" />
                    <label htmlFor="apple" className="text-blue-300">
                      Apple Pay
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Information Fields */}
              <div>
                <label className="block font-medium mb-1 text-blue-300">
                  Card number
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                    required
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div>
                <label className="block font-medium mb-1 text-blue-300">
                  Name on card
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-blue-300">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street, apt/suite, building (Optional)"
                  className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    State/Province/Region
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-blue-300">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full border border-gray-300 rounded p-2 bg-gray-800 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent text-white font-semibold rounded hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse"
                >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SubscriptionPage;