import mongoose from 'mongoose';

const Invoice = new mongoose.Schema({
    id: {
        type: String
    },
    reference: {
        type: String
    }
})

export default mongoose.model('invoices', Invoice);