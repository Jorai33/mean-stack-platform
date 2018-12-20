import mongoose from 'mongoose';
import InvoiceItem from './InvoiceItem.model';

const Invoice = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	reference: {
		type: String,
		required: true
	},
	saleDate: {
		type: String,
		required: true
	},
	dueDate: {
		type: String,
		required: true
	},
	contactId: {
		type: String,
		required: true
	},
	items: {
		type: [InvoiceItem]
	},
	notes: {
		type: String,
		required: false
	},
	subtotal: {
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
	outstanding: {
		type: Number,
		required: true
	},
	archived: {
		type: Boolean,
		required: false
	}
})

export default mongoose.model('invoices', Invoice);