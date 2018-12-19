import mongoose from 'mongoose';

const InvoiceItem = new mongoose.Schema({
      number: {
            type: Number,
            required: true
      },
      type: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      unitPrice: {
            type: Number,
            required: true
      },
      quantity: {
            type: Number,
            required: true
      },
      subtotal: {
            type: Number,
            required: true
      },
      taxCode: {
            type: Number,
            required: true
      },
      tax: {
            type: Number,
            required: true
      },
      total: {
            type: Number,
            required: true
      },
      notes: {
            type: String,
            required: false
      }
})

export default InvoiceItem;