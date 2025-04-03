# import stripe
# import os


# # Set your Stripe secret key (set this in your environment or replace the default below)
# stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_yourStripeSecretKey")

# def create_checkout_session(form_data):
#     """
#     Creates a Stripe Checkout Session.
#     Note: In a real-world scenario, you might use form_data to pass in dynamic amounts or product IDs.
#     """
#     session = stripe.checkout.Session.create(
#         payment_method_types=['card'],
#         line_items=[{
#             'price_data': {
#                 'currency': 'usd',
#                 'product_data': {
#                     'name': 'Spotify Premium',
#                     'description': 'Monthly subscription for Spotify Premium',
#                 },
#                 'unit_amount': 999,  # Amount in cents: $9.99
#             },
#             'quantity': 1,
#         }],
#         mode='subscription',
#         success_url='http://localhost:5173/success',  # Change as needed
#         cancel_url='http://localhost:5173/cancel',    # Change as needed
#     )



#     return session






# razorpay_service.py
import razorpay
import os

# Set your Razorpay key and secret from environment variables or hardcode for testing.
RAZORPAY_KEY = os.getenv("RAZORPAY_KEY", "your_razorpay_key")
RAZORPAY_SECRET = os.getenv("RAZORPAY_SECRET", "your_razorpay_secret")

client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))

def create_checkout_session(amount: int, currency: str = "INR", receipt: str = "order_rcptid_11"):
    # Create an order with Razorpay
    order_data = {
        "amount": amount,  # Amount in paise (e.g., ₹9.99 = 999 paise)
        "currency": currency,
        "receipt": receipt,
        "payment_capture": 1  # Auto capture payment
    }
    order = client.order.create(data=order_data)
    return order
