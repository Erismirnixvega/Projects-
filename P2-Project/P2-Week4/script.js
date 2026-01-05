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