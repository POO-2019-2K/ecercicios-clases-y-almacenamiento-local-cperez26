export default class Main {
    constructor() {
        let total = 0;
        let h1 = document.querySelector('#total');
        if (localStorage.getItem('total') != null) {
            total = Number(localStorage.getItem('total'));
            h1.innerHTML = '$' + total;
        }

        document.querySelector('#btn').addEventListener('click', () => {
            let cantidad = Number(document.querySelector('#cantidad').value);
            switch (document.querySelector('#tipo').value) {
                case 'deposito':
                    total += cantidad;
                    break;
                case 'retiro':
                    if (total >= cantidad) {
                        total -= cantidad;
                    }
                    else {
                        alert('No existen suficientes fondos para retirar');
                    }
                    break;
            }
            localStorage.setItem('total', total); 
            h1.innerHTML = '$' + total;
        });
    }
}

let main = new Main();