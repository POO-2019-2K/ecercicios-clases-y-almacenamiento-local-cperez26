export default class Main {
    constructor() {
        
        this._table = document.querySelector("#movimientos");
        this._arrayMovimientos = new Array();
        this._totalSaldo = 0;
        let saldo = document.querySelector("#saldo");

        if (localStorage.getItem('movimientos') != null) {
            this._arrayMovimientos = JSON.parse(localStorage.getItem('movimientos'));
            this._totalSaldo = Number(localStorage.getItem('totalMoney'));
            this._initTable();
            saldo.innerHTML = '$' + this._totalSaldo;
        }

        document.querySelector("#btn").addEventListener('click', () => {
            let tipo = document.querySelector("#tipo").value;
            let cantidad = Number(document.querySelector("#cantidad").value);
            let movimiento = true;
            if (tipo === 'deposito') {
                tipo = 'Depósito';
                this._totalSaldo += cantidad;
            } else {
                if (this._totalSaldo >= cantidad) {
                    tipo = 'Retiro';
                    this._totalSaldo -= cantidad;
                } else {
                    movimiento = false;
                    alert('No hay suficientes fondos para retirar');
                }
            }

            if (movimiento) {
                let objMovimientos = {
                    date: new Date(),
                    tipo: tipo,
                    cantidad: cantidad,
                    totalSaldo: this._totalSaldo
                }

                this._arrayMovimientos.push(objMovimientos);
                localStorage.setItem('movimientos', JSON.stringify(this._arrayMovimientos));
                localStorage.setItem('totalMoney', this._totalSaldo);
                saldo.innerHTML = '$' + this._totalSaldo;
                this._showInTable(objMovimientos);
            }
        });
    }

    _initTable() {
        let row;
        let cell;
        let date;

        this._arrayMovimientos.forEach(movimientos => {
            row = this._table.insertRow(-1);
            cell = row.insertCell(0);
            date = new Date(movimientos.date)
            cell.innerHTML = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
            cell = row.insertCell(1);
            cell.innerHTML = movimientos.tipo;
            cell = row.insertCell(2);
            cell.innerHTML = movimientos.cantidad;
            cell = row.insertCell(3);
            cell.innerHTML = movimientos.totalSaldo;
        });
    }

    _showInTable(objMovimientos) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        let date = new Date(objMovimientos.date)
        cell.innerHTML = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        cell = row.insertCell(1);
        cell.innerHTML = objMovimientos.tipo;
        cell = row.insertCell(2);
        cell.innerHTML = objMovimientos.cantidad;
        cell = row.insertCell(3);
        cell.innerHTML = objMovimientos.totalSaldo;
    }
}

let main = new Main();