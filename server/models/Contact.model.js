import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
    reference: {
        type: String
    }
})

export default mongoose.model('contacts', Contact);