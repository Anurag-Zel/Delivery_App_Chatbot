import mongoose from "mongoose";
import dotenv from "dotenv";

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    order_time: {
        type: String,
        required: true
    },
    order_items: {
        type: [String],
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    estimated_delivery: {
        type: Date,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    coins_used: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    }
});

const Order = mongoose.model('order_details', orderSchema);
export default Order;