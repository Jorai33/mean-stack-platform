import mongoose from 'mongoose';

const Expense = new mongoose.Schema({
    id: {
        type: String
    },
    reference: {
        type: String
    }
})

export default mongoose.model('expenses', Expense);