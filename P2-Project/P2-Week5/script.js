function ReDirect() {
    if (confirm("Klik OK om verder te gaan.")) {
        window.location.href = "dashboard.html";
    }
}


function ReDirect2() {
    if (confirm("Klik OK om verder te gaan.")) {
        window.location.href = "overschrijven.html";

    }
}

// Login systeem

const users = [
    { username: 'Daan', password: 'test'},
    { username: 'Julia', password: 'test2'},
    { username: 'Bram', password: 'test3'}
];



function getInfo() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password ) {
        alert('Vul alle velden in.');
        return;
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Inloggen succesvol!');
        document.querySelector('button').disabled = true;
        window.location.href = 'dashboard.html';
    }
    else {
        alert('Ongeldige gebruikersnaam of wachtwoord.');
        passwordInput.value = '';
        passwordInput.focus();
    }
};


// Rekeningen toevoegen

function Toevoegen(event) {
    const promptrek = prompt("Voeg een nieuwe rekening:", "Nieuwe Rekening");
    let newDiv = document.createElement("div");
    let newContent = document.createElement('p');
    let newGeld = document.createElement('p');

    if (promptrek != "" && promptrek !== null ) {
        newDiv.classList.add('rekeningborder');
        newContent.innerText = promptrek;
        newGeld.innerText = '€0.00';

        document.querySelector('.coverborder').appendChild(newDiv);
        newDiv.append(newContent);
        newDiv.append(newGeld);
    }
    else {
        event.preventDefault();
    }
};

// Overschrijven

function Overschrijven() {
    const valueBedrag = document.querySelector('#bedrag').value;
    const valueSelect = document.querySelector('#selectvalue').value;
    const valueSelect2 = document.querySelector('#selectvalue2').value;

    /* REGEX MATCH: Alleen voor nummers */
    const regex = /\d+/g;
    const totaalSelect = valueSelect.match(regex).join('');

    /* Een omzetting van string naar int */
    const x = parseInt(valueBedrag);
    const y = parseInt(totaalSelect);

    if ( y >= x ) {
        alert("€" + valueBedrag + " is overschreven van " + valueSelect + " naar " + valueSelect2 + "!");
    }
    else {
        alert("Ongeldige bedrag.");
    }
};

// Transactie 

const transactions = [
  { id: 't1', type: 'inkomend', bedrag: 100, date: '2025-12-01' },
  { id: 't2', type: 'uitgaand', bedrag: -50, date: '2025-12-05' },
  { id: 't3', type: 'inkomend', bedrag: 200, date: '2025-12-10' },
  { id: 't4', type: 'uitgaand', bedrag: -25, date: '2025-12-12' },
];

const transactionListEl = document.getElementById('transactionList');


function renderTransactions(filteredTransactions) {
  transactionListEl.innerText = ''; 

  filteredTransactions.forEach(transaction => {
    const li = document.createElement('li');
    li.className = transaction.type; 
    li.textContent = `${transaction.date} - ${transaction.type.toUpperCase()}: €${transaction.bedrag}`;
    transactionListEl.appendChild(li);
  });
}

function applyFilter() {
  const selectElement = document.getElementById('filterType');
  const selectedType = selectElement.value;

  let filteredList;
  
  if (selectedType === 'alle') {
    filteredList = transactions;
  } else {
    
    filteredList = transactions.filter(t => t.type === selectedType);
  }

  renderTransactions(filteredList);
}

function applyDateFilter() {
  const startDateInput = document.getElementById('startDate').value;
  const endDateInput = document.getElementById('endDate').value;

  const filterStartDate = new Date(startDateInput);
  const filterEndDate = new Date(endDateInput);

  const filteredList = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= filterStartDate && transactionDate <= filterEndDate;
  });

  renderTransactions(filteredList);
}

document.addEventListener('DOMContentLoaded', () => {
    applyFilter();
    applyDateFilter(); 

});
