// const API_URL = `https://680f7a6167c5abddd1957bcd.mockapi.io/Name`;
// const contactList = document.getElementById('contactList');
// const adddContactBTn =document.getElementById('addContact');

// async function fetchContacts() {
//     const response = await fetch (API_URL);
//     const contacts = await response.json();
//     renderContacts(contaccts);
// }
// function renderContacts (contacts){
//     contactList.innerHTML = '';
//     contacts.forEach(contact => {
//     const li = document.createElement('li'); 
//     li.innerHTML = `
//     <span>${contact.name} - ${contact.number}</span>
//     <button class ='edit-btn' onclick = 'editContact(${contact.id})'></button>
//         <button class ='delete-btn' onclick = ' deleteContact(${contact.id})'></button>
//         `;
//         contactList.appenChild(li);
//     });
//     }

const API_URL = `https://680f7a6167c5abddd1957bcd.mockapi.io/Name`;
const contactList = document.getElementById('contactList');
const addContactBtn = document.getElementById('addContact');

const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');

let editingId = null;

// Загрузка и отображение контактов
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        console.error('Ошибка при загрузке контактов:', error);
    }
}


function renderContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.number}</span>
            <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.number}')">✏️ Редактировать</button>
            <button onclick="deleteContact(${contact.id})">🗑️ Удалить</button>
        `;
        contactList.appendChild(li);
    });
}


addContactBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();

    if (!name || !number) {
        alert('Пожалуйста, введите имя и номер');
        return;
    }

    try {
        if (editingId) {
            // Обновление
            await updateContact(editingId, name, number);
            editingId = null;
            addContactBtn.textContent = 'Add contact';
        } else {
            
            await addContact(name, number);
        }

        nameInput.value = '';
        numberInput.value = '';
        await fetchContacts();
    } catch (error) {
        console.error('Ошибка при сохранении контакта:', error);
    }
});

async function addContact(name, number) {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number })
    });
}


async function updateContact(id, name, number) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number })
    });
}


async function deleteContact(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        await fetchContacts();
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
}


