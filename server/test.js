const server = require('./server');

// const item = {
//     id: '004',
//     number: 4,
//     reference: 'Invoice Four - 26/10/18'
// }

// server.put('invoices', item)  
//     .then(invoice => {
//         console.log('Invoice created:', invoice);
//         getInvoices();
//     })
//     .catch(err => {
//         console.log('Error creating invoice:', err);
//     })

async function getInvoices() {
    try {
        const invoices = await server.get('invoices');
        console.log('Invoices:', invoices);
    } catch(err) {
        console.error('Error retrieving invoices:', err);
    }
}

// server.createTable('invoices')
//     .then(res => {
//         console.log(`Table 'contacts' invoices`, res);
//     })
//     .catch(err => {
//         console.error(`Error creating table 'invoices':`, err);
//     })

server.delete('invoices', '004')
    .then(item => {
        console.log(`Item deleted`);
        getInvoices();
    })
    .catch(err => {
        console.error(`Error deleting item from table 'invoices':`, err);
    })