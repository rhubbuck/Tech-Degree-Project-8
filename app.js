const apiUrl = 'https://randomuser.me/api/?results=12';
let employees = [];
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const card = document.querySelector('.card');

//Fetch API info and display into grid

function displayEmployees (employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class='card'>
            <img class='profile-img' src=${picture.large}>
            <div class='text-container'>
                <h2 class='name'>${name.first} ${name.last}</h2>
                <p class='email'>${email}</p>
                <p class='address'>${city}</p>
            </div>
        </div> 
        `
    });
    gridContainer.innerHTML = employeeHTML;
};

fetch(apiUrl)
    .then(response => response.json())
    .then(response => response.results)
    .then(displayEmployees)
    .catch(error => console.log(error))

//Fetch info for modal and display with click

card.addEventListener('click', (e) => {
    
})
