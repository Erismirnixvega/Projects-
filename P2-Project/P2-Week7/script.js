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

  /* Waarde van selected type */
  const selectedType = selectElement.value;

  let filteredList;
  
  if (selectedType === 'alle') {
    filteredList = transactions;
  } else {

    /* Filter kiest van T = T1-T4  naar type met selectie aan inkomend/uitgaand */
    
    filteredList = transactions.filter(t => t.type === selectedType);

    
  }

  
  renderTransactions(filteredList);
}


function applyDateFilter() {
  const startDateInput = document.getElementById('startDate').value;
  const endDateInput = document.getElementById('endDate').value;

  const filterStartDate = new Date(startDateInput);
  const filterEndDate = new Date(endDateInput);

   /* Filter kiest van */

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


// Crypto Valuta portfolio

 // Object portfolio met waarden voor elke cryptocurrency

 const portfolio = {
            bitcoin: 0,
            ethereum: 0,
            litecoin: 0
        };

        function handleTransaction(type) {
            const crypto = document.getElementById('cryptoSelect').value;
            const amount = parseFloat(document.getElementById('amountInput').value);
            const messageEl = document.getElementById('message');

            // Validatie

            if (isNaN(amount) || amount <= 0) {
                alert("Voer een geldig bedrag in.");
                return;
            }

      
            if (type === 'buy') {

              // voorbeeld: Object 'bitcoin' verbindt met select waarde 'bitcoin'.
          
                portfolio[crypto] += amount;
                messageEl.innerText = `Je hebt €${amount.toFixed(2)} in ${crypto.charAt(0).toUpperCase() + crypto.slice(1)} geïnvesteerd.`;
            } else {
                if (portfolio[crypto] < amount) {
                    alert("Onvoldoende saldo om te verkopen.");
                    return;
                }
                portfolio[crypto] -= amount;
                messageEl.innerText = `Je hebt €${amount.toFixed(2)} aan ${crypto} verkocht.`;
            }

            updateUI();
        }

        function updateUI() {
            // Update de weergegeven saldo
            document.getElementById('bal-bitcoin').innerText = portfolio.bitcoin.toFixed(2);
            document.getElementById('bal-ethereum').innerText = portfolio.ethereum.toFixed(2);
            document.getElementById('bal-litecoin').innerText = portfolio.litecoin.toFixed(2);
        }

       // Simuleer prijsveranderingen elke 3 seconden

        setInterval(function () {

           // Randomizer dus, math.floor = afronden, math.random = willekeurig getal

          let btcPrice = Math.floor(Math.random() * (500 - 90) + 300);
          let ethPrice = Math.floor(Math.random() * (260 - 40) + 160);
          let ltcPrice = Math.floor(Math.random() * (10 - 4) + 16);


          document.getElementById('bal-bitcoin').innerText = btcPrice + ",00";
          document.getElementById('bal-ethereum').innerText = ethPrice + ",00";
          document.getElementById('bal-litecoin').innerText = ltcPrice + ",00";
        }, 3000);


// Beleggen

// Data object met prijzen voor aandelen en crypto

const data = {
    stocks: {
      TechCorp: 120,
      FoodInc: 75,
      Banky: 32
    },
    crypto: {
      Bitcoin: 32000,
      Ethereum: 2100,
      Doge: 0.12
    }
  };

  // Saldo waarde
  let saldo = 760;
  // bezit[productNaam] = aantal eenheden
  const bezit = {};

  // totaalInvestering[productNaam] = totaal inleg
  const totaalInvestering = {};


  const saldoSpan   = document.getElementById('saldo-bedrag');
  const categorieEl = document.getElementById('categorie');
  const productEl   = document.getElementById('product');
  const prijsSpan   = document.getElementById('prijs');
  const inBezitSpan = document.getElementById('in-bezit');
  const bedragInput = document.getElementById('bedrag');
  const koopBtn     = document.getElementById('koop');
  const verkoopBtn  = document.getElementById('verkoop');
  const meldingDiv  = document.getElementById('melding');
  const totaalInvP  = document.getElementById('totaal-investering');

  // van 760 naar 760,00
  function formatMoney(n) {
    return n.toFixed(2).replace('.', ',');
  }

   // Error message
  function setMelding(msg, type='error') {

    // error = true, success = false. Werkt als een boolean.
    meldingDiv.className = type === 'error' ? 'error' : 'success';
    meldingDiv.textContent = msg; // Setmelding teksten worden hier weergegeven
  }


  // Vernieuwd de saldo op HTML.
  function updateSaldo() {
    saldoSpan.textContent = saldo.toFixed(2);
  }

  // Data leest de geselecteerde waarde van categorie en het product uit de dropdown's.
  function getHuidigePrijs() {
    const cat = categorieEl.value;
    const product = productEl.value;
    return data[cat][product];
  }

  // Wordt aangeroepen wanneer de gebruiker de "categorie" wijzigt
  function updateProductSelect() {
    const cat = categorieEl.value;
    productEl.innerHTML = '';


    // Doorloopt alle producten die beschikbaar zijn in de geselecteerde categorie.
    Object.keys(data[cat]).forEach(naam => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = naam;
      productEl.appendChild(opt);
    });
    updatePrijsEnBezit();
  }

  //  Wordt aangeroepen wanneer de categorie of productselectie verandert, of wanneer de prijzen slingert.
  function updatePrijsEnBezit() {
    const prijs = getHuidigePrijs();
    prijsSpan.textContent = prijs.toFixed(2);
    const product = productEl.value;
    inBezitSpan.textContent = bezit[product].toFixed(0) || 0;
    updateTotaalInvesteringText(product);
  }

   // Neemt de huidige productnaam en berekent het totale bedrag dat in dat product is geïnvesteerd.
  function updateTotaalInvesteringText(product) {

    // || 0 zorgt ervoor dat de standaardwaarde 0 is als het product nog niet in bezit is.
    const totaal = totaalInvestering[product] || 0;
    if (totaal > 0) {
      
      // Weergeven van totale investering in HTML

      totaalInvP.innerHTML =
        `Je hebt €${formatMoney(totaal)} geïnvesteerd in ${product}.`;
    } else {
      totaalInvP.textContent = '';
    }
  }

  // Simuleer kleine prijsveranderingen elke 3 seconden
  setInterval(() => {
    const cat = categorieEl.value;
    const product = productEl.value;
    let prijs = data[cat][product];

    // Genereert een willekeurig getal tussen -0,01 en +0,01. Door hier 1 bij op te tellen, ontstaat een factor tussen 0,99 en 1,01
    prijs = Math.max(0.01, prijs * factor);
    data[cat][product] = prijs;
    updatePrijsEnBezit();
  }, 3000);  // 3 seconden

  // --- Event listeners -----------------------------------------
  categorieEl.addEventListener('change', updateProductSelect);
  productEl.addEventListener('change', updatePrijsEnBezit);

  koopBtn.addEventListener('click', () => {
    const bedrag = Number(bedragInput.value);
    if (!bedrag || bedrag <= 0) return setMelding('Vul een geldig bedrag in.');
    const prijs = getHuidigePrijs();
    const kosten = bedrag;                 // je voert in: geldbedrag
    const units  = kosten / prijs;         // hoeveel eenheden koop je

    if (kosten > saldo) {
      return setMelding('Onvoldoende saldo.', 'error');
    }
    saldo -= kosten;
    const product = productEl.value;
    bezit[product] = (bezit[product] || 0) + units;
    totaalInvestering[product] = (totaalInvestering[product] || 0) + kosten;

    updateSaldo();
    updatePrijsEnBezit();
    setMelding(`Koop succesvol: ${units.toFixed(4)} eenheden gekocht.`, 'success');
  });

  
  verkoopBtn.addEventListener('click', () => {
    const bedrag = Number(bedragInput.value);
    if (!bedrag || bedrag <= 0) return setMelding('Vul een geldig bedrag in.');
    const prijs = getHuidigePrijs();
    const product = productEl.value;
    // Voegt de gekochte eenheden toe aan het bezit van dat product. || 0 behandelt het geval waarin het product nog niet in bezit was.
    const unitsInBezit = bezit[product] || 0;
    const unitsTeVerkopen = bedrag / prijs;

    if (unitsTeVerkopen > unitsInBezit) {
      return setMelding('Je bezit niet genoeg eenheden om dit bedrag te verkopen.', 'error');
    }

    // werk bezit en saldo bij
    bezit[product] = unitsInBezit - unitsTeVerkopen;
    const opbrengst = unitsTeVerkopen * prijs;
    saldo += opbrengst;

    // eenvoudige benadering: verlaag totale investering met het verkochte bedrag.
    totaalInvestering[product] =  Math.max(0, (totaalInvestering[product] || 0) - bedrag);

    updateSaldo();
    updatePrijsEnBezit();
    setMelding(`Verkoop succesvol: €${formatMoney(opbrengst)} ontvangen.`, 'success');
  });

  updateSaldo();
  updateProductSelect();

  

  




  