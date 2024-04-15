import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./Database/connection.js";
import Order from "./Models/Order.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get("/", (req,res) => {
    res.send("Test");
})

// app.get("/test", async (req,res) => {
//     const allOrders = await Order.find({});
//     res.json({allOrders});
// })

app.post("/gemini", async (req,res) => {
    const userMessage = req.body.message;
    const userChatHistory = req.body.chatHistory;

    console.log(`length : ${userChatHistory.length}`);

    const model = genAI.getGenerativeModel({model : "gemini-pro"});

    

    if(userChatHistory.length === 0){
        const response = "You are a Delivery App Chatbot for a company named Lightning Delivery. Ask for the user's order ID. Order Id is 8 digit all numeric code";

        const chat = model.startChat({
            history : userChatHistory 
        });

        const result = await chat.sendMessage(response);
        console.log(result.response.text());
        res.json(result.response.text());

    }else if(userChatHistory.length === 2){
        const id = userMessage.match(/\d+/);

        const order_details = await Order.findOne({order_id : id});
        console.log(order_details);

        if(!order_details){
            const errorMessage = "Sorry, we couldn't find an order with that ID.";
            res.json(errorMessage);
        }else{
            const { order_id, customer_name, order_date, order_time, order_items, order_status, estimated_delivery, payment_type, coins_used } = order_details;

            const formattedOrderItems = order_items.join(", "); 

            const message = `Here are the Order Details for Order ID ${order_id.$numberInt}:
            Customer Name: ${customer_name}
            Order Date: ${order_date}
            Order Time: ${order_time}
            Order Items: ${formattedOrderItems}
            Order Status: ${order_status}
            Estimated Delivery: ${estimated_delivery}
            Payment Type: ${payment_type}
            Coins Used: ${coins_used}. The user is confirmed`;

            
            const chat = model.startChat({
                history : userChatHistory
            })

            const result = await chat.sendMessage(message);
            console.log("In here");
            console.log(result.response.text());
            res.json(result.response.text());
        }
    }else{
        const chat = model.startChat({
            history : userChatHistory
        })

        const results = await chat.sendMessage(req.body.message);
        console.log(results.response.text());
        res.json(results.response.text());
    }
    
})

connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server Running on port ${port}.`);
        })
    }catch(error){
        console.log("Error while connecting...");
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})