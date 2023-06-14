function acharChoquePlaca(){
    console.log('Acharchoque1')
    var user = {
        placa: document.getElementById('placa').value,
    }
    fetch('http://localhost:9696/choqueVagao', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

function send2() {
    console.log('Botao2 funcionou')
    var user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    fetch('http://127.0.0.1:3200/cadastrar', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}