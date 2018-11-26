export default interface InvoicePayment {
    id: string,
    invoiceId: string,
    date: string,
    amount: number,
    notes?: string
}