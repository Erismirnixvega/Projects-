// Our dataset (same as before)
const transactions = [
  { id: 't1', type: 'deposit', amount: 100 },
  { id: 't2', type: 'withdrawal', amount: 50 },
  { id: 't3', type: 'deposit', amount: 200 },
  { id: 't4', type: 'withdrawal', amount: 25 },
];

const transactionListEl = document.getElementById('transactionList');

// Function to render transactions into the HTML list
function renderTransactions(filteredTransactions) {
  transactionListEl.innerHTML = ''; // Clear current list

  filteredTransactions.forEach(transaction => {
    const li = document.createElement('li');
    // Add CSS class based on type for styling
    li.className = transaction.type; 
    li.textContent = `${transaction.type.toUpperCase()}: $${transaction.amount}`;
    transactionListEl.appendChild(li);
  });
}

// Function triggered by the HTML <select> change event
function applyFilter() {
  const selectElement = document.getElementById('filterType');
  const selectedType = selectElement.value;

  let filteredList;
  
  if (selectedType === 'all') {
    filteredList = transactions;
  } else {
    // Use the filter method we discussed earlier
    filteredList = transactions.filter(t => t.type === selectedType);
  }

  renderTransactions(filteredList);
}

// Initial render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    applyFilter(); // Renders 'all' initially
});

