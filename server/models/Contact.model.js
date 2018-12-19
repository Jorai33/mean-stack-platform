import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
    reference: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephonePrimary: {
        type: String,
        required: false
    },
    telephoneSecondary: {
        type: String,
        required: false
    },
    address: {
        reference: {
            type: String,
            required: false
        },
        line1: {
            type: String,
            required: false
        },
        line2: {
            type: String,
            required: false
        },
        townCity: {
            type: String,
            required: false
        },
        countyState: {
            type: String,
            required: false
        },
        postcode: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        }
    },
    vatNumber: {
        type: Number,
        required: false
    }
})

export default mongoose.model('contacts', Contact);