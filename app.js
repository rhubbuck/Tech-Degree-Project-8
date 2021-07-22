const apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
let employees = [];
const gridContainer = document.querySelector('.grid-container');
const modalContainer = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal-close'); 

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
        <div class='card' data-index='${index}'>
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


function displayModal(index) {
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
    <img class='profile-img' src='${picture.large}'>
    <div class='text-container'>
        <h2 class='name'>${name.first} ${name.last}</h2>
        <p class='email'>${email}</p>
        <p class='address'>${city}</p>
        <hr/>
        <p class='phone'>${phone}</p>
        <p class='address'>${street}, ${state} ${postcode}</p>
        <p class='birthday'>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    <div class ="button-box">
        <button class="modal-nav" id="prev">&#8592</button>
        <button class="modal-nav" id="next">&#8594</button>
    </div>
    `;
    
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
 

    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    prev.addEventListener('click', (e) => {
        if (index === 0) {
            displayModal(11);
        } else {
            displayModal(index - 1);
        }
    });

    next.addEventListener('click', (e) => {
       if (index === 11) {
            displayModal(0);
        } else {
            displayModal(index + 1);
        }
    });
};

gridContainer.addEventListener('click', (e) => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        index = parseInt(card.getAttribute('data-index'));
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// Search Bar

const searchBar = document.getElementById('search');

const searchFunction = (search) => {
    let nameBoxes = document.querySelectorAll('.name');
    let searchLetters = search.target.value.toLowerCase();

    nameBoxes.forEach((nameBox) => {
        let nameText = nameBox.textContent.toLowerCase();
        let card = nameBox.parentElement.parentElement;
        
        if (nameText.includes(searchLetters)) {
            card.style.display = 'flex'; 
        } else {
            card.style.display = 'none';
        }
    });
};

searchBar.addEventListener('keyup', searchFunction);