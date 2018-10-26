const server = require('./server');

const item = {
    id: '003',
    number: 3,
    reference: 'Invoice Three - 26/10/18'
}

server.put('invoices', item)  
    .then(invoice => {
        console.log('Invoice created:', invoice);
        getInvoices();
    })
    .catch(err => {
        console.log('Error creating invoice:', err);
    })

async function getInvoices() {
    try {
        const invoices = await server.get('invoices');
        console.log('Invoices:', invoices);
    } catch(err) {
        console.error('Error retrieving invoices:', err);
    }
}