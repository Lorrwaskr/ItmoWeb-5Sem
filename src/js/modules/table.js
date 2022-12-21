(function() {
    window.addEventListener('load', () => {
        if (location.pathname.includes(`table.html`)){
            table();
        }
    })
})();

let rows, columns, tableArray;

console.log(document.forms)

function table() {
    if (localStorage["tableArray"] && localStorage["tableRows"] && localStorage["tableColumns"]) {
        tableArray = JSON.parse(localStorage["tableArray"]);
        rows = JSON.parse(localStorage["tableRows"]);
        columns = JSON.parse(localStorage["tableColumns"]);

        let tableSample = document.createElement('div');
        tableSample.classList.add('table');
        tableSample.style.gridTemplateColumns=`repeat(${columns}, 1fr)`;
        for (let index = 0; index < rows * columns; index++) {
            let tableSampleElement = document.createElement('div');
            tableSampleElement.classList.add('table__element');
            tableSampleElement.innerText = tableArray[index];
            tableSample.insertAdjacentElement(
                'beforeend',
                tableSampleElement
            )
        }
        document.querySelector('main').insertAdjacentElement(
            'beforeend',
            tableSample
        )

        document.querySelector('.create-table').classList.add('hidden');
        document.querySelector('.fill-table').classList.remove('hidden');
    }

    const createTableForm = document.forms["create-table"];

    createTableForm.addEventListener("submit", function (event) {
        event.preventDefault();
        rows = createTableForm.rows.value;
        columns = createTableForm.columns.value;
        tableArray = Array(rows * columns).fill(0);

        let tableSample = document.createElement('div');
        tableSample.classList.add('table');
        tableSample.style.gridTemplateColumns=`repeat(${columns}, 1fr)`;
        for (let index = 0; index < rows * columns; index++) {
            let tableSampleElement = document.createElement('div');
            tableSampleElement.classList.add('table__element');
            tableSampleElement.innerText = '0';
            tableSample.insertAdjacentElement(
                'beforeend',
                tableSampleElement
            )
        }
        document.querySelector('main').insertAdjacentElement(
            'beforeend',
            tableSample
        )

        document.querySelector('.create-table').classList.add('hidden');
        document.querySelector('.fill-table').classList.remove('hidden');

        let tableArrayJSON = JSON.stringify(tableArray);
        localStorage.setItem("tableArray", tableArrayJSON);
        localStorage.setItem("tableRows", rows);
        localStorage.setItem("tableColumns", columns);
    });
    
    const fillTableForm = document.forms["fill-table"];

    fillTableForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let row = fillTableForm.row.value;
        let column = fillTableForm.column.value;

        if (row > rows || column > columns) {
            alert("Введите корректные данные");
            return;
        }

        let table = document.querySelector('.table');
        let targetIndex = (row - 1) * columns + +column - 1;
        tableArray[targetIndex] = fillTableForm.text.value;
        table.children[targetIndex].innerText = fillTableForm.text.value;

        let tableArrayJSON = JSON.stringify(tableArray);
        localStorage.setItem("tableArray", tableArrayJSON);
    });

    fillTableForm.addEventListener("reset", function(event) {
        localStorage.clear();

        rows = columns = tableArray = 0;
        document.querySelector('.table').remove();

        document.querySelector('.create-table').classList.remove('hidden');
        document.querySelector('.fill-table').classList.add('hidden');
    })
}