import mongoose from 'mongoose';

const Mileage = new mongoose.Schema({
    id: {
        type: String
    },
    reference: {
        type: String
    }
})

export default mongoose.model('mileage', Mileage);