# Delivery App Chatbot

Welcome to the Delivery App Chatbot repository! This project contains code for an AI-based chatbot designed for a delivery application. The chatbot assists users with various inquiries related to their orders.

## Overview

The chatbot is built using React for the front end and Node.js with Express for the backend. It utilizes Google's Generative AI for generating responses to user queries. The chat interface allows users to interact with the chatbot in real-time.

## Deployment Details
1. Frontend :- deployed on netlify.com
`https://661ccd7a2a20321744a4b03c--musical-fenglisu-14a9f6.netlify.app/`.
2. Backend :- deployed on render.com 
`https://delivery-app-chatbot.onrender.com`.

## Features

- **Real-time Interaction**: Users can chat with the chatbot in real-time, receiving instant responses to their queries.
- **Order Inquiry**: Users can inquire about their order status by providing their order ID.
- **Detailed Responses**: The chatbot provides detailed information about orders, including:- 
    - `order_date`: The date when the order was placed.
    - `order_time`: The time when the order was placed.
    - `order_items`: The list of items included in the order.
    - `order_status`: The current status of the order.
    - `estimated_delivery`: The estimated delivery date.
    - `payment_type`: The payment method used for the order.
    - `coins_used`: Whether coins were used for the payment (Yes/No).

## Project Structure

- **`App.js`**: React component file containing the front-end code for the chat interface.
- **`server.js`**: Node.js backend server code responsible for handling user requests, processing them using Google's Generative AI, and sending back responses.
- **`Database`**: Contains database connection code (`connection.js`).
- **`Models`**: Contains the `Order` model representing the order schema.

## Example Chats

1.  Test Case:- Querying Order Status
    ```
    User: Where is my order?
    Model: Automated Response asking for Order_Id
    User: Here, 23599046
    Model: Automated Response for order details if order_id is correct.
    User: Thanks, that's all
    Model: Automated Response
    ```
2.  Test Case :- Inquiring Order Status   
    ```
    User: What is the order status of my order?
    Model: Automated Response asking for Order_Id
    User: 23599048
    Model: Automated Response for order details if order_id is correct.
    User: Thanks, that's all.
    Model: Automated Response.
    ```
3.  Test Case :- Payment Inquiry    
    ```
    User: Have I already paid for my orders?
    Model: Automated Response asking for Order_Id
    User: 23599049
    Model: Automated Response for order details if order_id is correct.
    ```

## Usage
1. Open the application in your web browser.
2. Enter your query or order ID in the chat interface.
3. Press the "Ask Me" button to send your query to the chatbot.
4. Receive real-time responses from the chatbot regarding your inquiry.

## Setup Instructions

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies:
   ```bash
   cd delivery-app-chatbot
   npm install
   ```

3. Set up environment variables:
Add necessary environment variables such as PORT and API_KEY.   
4. Start server : 
    ```
    npm run start
    ```    