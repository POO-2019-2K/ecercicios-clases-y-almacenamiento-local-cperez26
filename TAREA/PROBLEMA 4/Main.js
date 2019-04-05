class Main {
    constructor() {
        
        this._table = document.querySelector("#tableEstudiantes");
        this._studentsArray = new Array();

        if (localStorage.getItem('estudiantes') != null) {
            this._studentsArray = JSON.parse(localStorage.getItem('estudiantes'));
            this._initTable();
        }

        document.querySelector('#btnAdd').addEventListener('click', () => {
            if (this._boxesIsFull()) {
                let objEstudiantes = this._createObjectStudent();
                if (!this._studentIsInLocalStorange(objEstudiantes)) {
                    this._studentsArray.push(objEstudiantes);
                    localStorage.setItem('estudiantes', JSON.stringify(this._studentsArray));
                    this._showInTable(objEstudiantes);
                } else {
                    alert('El alumno ya fue registrado');
                }
            } 
            else {
                alert('Ingrese todos los datos para continuar');
            }
        });

        document.querySelector("#btnAsistencia").addEventListener('click', () => {
            if (this._boxesIsFull()) {
                let objEstudiantes = this._createObjectStudent();
                if (this._studentIsInLocalStorange(objEstudiantes)) {
                    this._studentsArray.forEach((estudiantes) => {
                        if (Number(estudiantes.cuenta) === Number(document.querySelector("#cuenta").value)) {
                            estudiantes.asistencias++;
                        }
                    });
                    localStorage.setItem('estudiantes', JSON.stringify(this._studentsArray));
                    this._cleanTable();
                    this._initTable();
                }
                else {
                    alert('El alumno no se encuntra registrado');
                }
            }
            else {
                alert('Ingrese todos los datos para continuar');
            }
        });
    }

    _initTable() {
        let row;
        let cell;
        this._studentsArray.forEach((estudiantes => {
            row = this._table.insertRow(-1);
            cell = row.insertCell(0);
            cell.innerHTML = estudiantes.cuenta;
            cell = row.insertCell(1);
            cell.innerHTML = estudiantes.nombre;
            cell = row.insertCell(2);
            cell.innerHTML = estudiantes.asistencias;
        }));
    }

    _cleanTable() {
        for (let i = this._table.rows.length - 1; i > 0; i--) {
            this._table.deleteRow(i);
        }
    }

    _showInTable(objEstudiantes) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objEstudiantes.cuenta;
        cell = row.insertCell(1);
        cell.innerHTML = objEstudiantes.nombre;
        cell = row.insertCell(2);
        cell.innerHTML = objEstudiantes.asistencias;
    }

    _studentIsInLocalStorange(objEstudiantes) {
        let isCreate = false;
        this._studentsArray.forEach((estudiantes) => {
            if (estudiantes.cuenta == objEstudiantes.cuenta) {
                return true;
            }
        });
        return isCreate;
    }

    _createObjectStudent() {
        let inputCuenta = document.querySelector("#cuenta");
        let inputNombre = document.querySelector("#nombre");

        let objEstudiantes = {
            cuenta: Number(inputCuenta.value),
            nombre: inputNombre.value,
            asistencias: 0
        }

        inputCuenta.value = '';
        inputNombre.value = '';

        return objEstudiantes;
    }

    _boxesIsFull() {
        if (document.querySelector("#cuenta").value != '' && document.querySelector("#nombre").value != '') {
            return true;
        }
        else {
            return false;
        }
    }
}

let main = new Main();