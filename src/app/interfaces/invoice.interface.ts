import InvoiceItem from './invoiceItem.interface';

export default interface Invoice {
    id: string,
    reference: string,
    saleDate: string,
    dueDate: string,
    contactId: string,
    items: InvoiceItem[],
    notes?: string,
    subtotal: number,
    tax: number,
    total: number,
    outstanding: number
}