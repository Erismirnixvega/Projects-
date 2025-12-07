function ReDirect() {
    if (confirm("Klik OK om verder te gaan.")) {
        window.location.href = "rekeningen.html";
    }
}


function ReDirect2() {
    if (confirm("Klik OK om verder te gaan.")) {
        window.location.href = "overschrijvingen.html";

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
        window.location.href = 'overschrijvingen.html';
    }
    else {
        alert('Ongeldige gebruikersnaam of wachtwoord.');
        passwordInput.value = '';
        passwordInput.focus();
    }

};
