class Main {
    constructor() {
        
        this._table = document.querySelector('#estudiantes');
        this._studentsArray = new Array();

        if (localStorage.getItem('ingresados') != null) {
            this._studentsArray = JSON.parse(localStorage.getItem('ingresados'));
            this._initTable();
        }

        document.querySelector('#btnAdd').addEventListener('click', () => {
            let isCreate = false;
            let inputCuenta = document.querySelector('#cuenta');
            let inputNombre = document.querySelector('#nombre');

            let objEstudiante = {
                cuenta: Number(inputCuenta.value),
                nombre: inputNombre.value
            }

            this._studentsArray.forEach((estudiante) => {
                if (estudiante.Cuenta == objEstudiante.Cuenta) {
                    isCreate = true;
                }
            });

            inputCuenta.value = '';
            inputNombre.value = '';

            if (!isCreate) {
                this._studentsArray.push(objEstudiante);
                localStorage.setItem('ingresados', JSON.stringify(this._studentsArray));
                alert('REGISTRADO CON EXITO');
                this._showInTable(objEstudiante);
            } else {
                alert('YA REGISTRADO CON ANTERIORIDAD');
            }
            
        });
    }

    _initTable() {
        let row;
        let cell;
        this._studentsArray.forEach((estudiante => {
            row = this._table.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = estudiante.cuenta;
            cell = row.insertCell(1);
            cell.innerHTML = estudiante.nombre;
        }));
    }

    _showInTable(objEstudiante) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objEstudiante.cuenta;
        cell = row.insertCell(1);
        cell.innerHTML = objEstudiante.nombre;
    }
}

let main = new Main();