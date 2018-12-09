import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
    id: {
        type: String
    },
    reference: {
        type: String
    }
})

export default mongoose.model('contacts', Contact);