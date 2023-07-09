const readline = require('readline-sync');

class Contact {
  constructor(firstName, lastName, phoneNumber, email, address, city, state, zip) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}

const contacts = [];

function validateName(name) {
  if (!/^[A-Z][a-zA-Z]{2,}$/.test(name)) {
    throw new Error('Invalid name. First letter should be capital and minimum 3 characters required.');
  }
}

function validateAddress(address) {
  if (address.length < 4) {
    throw new Error('Invalid address. Minimum 4 characters required.');
  }
}

function validateCity(city) {
  if (city.length < 4) {
    throw new Error('Invalid city. Minimum 4 characters required.');
  }
}

function validateState(state) {
  if (state.length < 4) {
    throw new Error('Invalid state. Minimum 4 characters required.');
  }
}

function validateZip(zip) {
  if (!/^\d{6}$/.test(zip)) {
    throw new Error('Invalid ZIP code. ZIP code should be 6 digits.');
  }
}

function validatePhone(phone) {
  if (!/^\d{10}$/.test(phone)) {
    throw new Error('Invalid phone number. Phone number should be 10 digits.');
  }
}

function validateEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email address.');
  }
}

function checkDuplicate(name) {
  const normalizedSearch = name.toLowerCase();
  return contacts.some(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName === normalizedSearch;
  });
}

function searchByCity(city) {
  const searchResults = contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
  return searchResults;
}
function searchByState(state) {
  const searchResults = contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());
  return searchResults;
}
function displaySearchResults(results) {
  console.log('Search Results:');
  if (results.length === 0) {
    console.log('No contacts found.');
    return;
  }
  results.forEach((contact, index) => {
    console.log(`${index + 1}. Contact ${index + 1}`);
    console.log('First Name:', contact.firstName);
    console.log('Last Name:', contact.lastName);
    console.log('Phone Number:', contact.phoneNumber);
    console.log('Email:', contact.email);
    console.log('Address:', contact.address);
    console.log('City:', contact.city);
    console.log('State:', contact.state);
    console.log('ZIP Code:', contact.zip);
    console.log('--------------------------');
  });
}

function displayContacts() {
  console.log('--- Display Contacts ---');

  if (contacts.length === 0) {
    console.log('Address book is empty.');
    return;
  }

  const choice = readline.question('1. Display all contacts\n2. Search by city or state\nEnter your choice (1-2): ');

  switch (choice) {
    case '1':
      console.log('Contacts in the address book:');
      contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Contact ${index + 1}`);
        console.log('First Name:', contact.firstName);
        console.log('Last Name:', contact.lastName);
        console.log('Phone Number:', contact.phoneNumber);
        console.log('Email:', contact.email);
        console.log('Address:', contact.address);
        console.log('City:', contact.city);
        console.log('State:', contact.state);
        console.log('ZIP Code:', contact.zip);
        console.log('--------------------------');
      });
      break;
    case '2':
      const searchOption = readline.question('1. Search by city\n2. Search by state\nEnter your choice (1-2): ');

      switch (searchOption) {
        case '1':
          const city = readline.question('Enter the city to search for: ');
          const cityResults = searchByCity(city);
          displaySearchResults(cityResults);
          break;
        case '2':
          const state = readline.question('Enter the state to search for: ');
          const stateResults = searchByState(state);
          displaySearchResults(stateResults);
          break;
        default:
          console.log('Invalid choice. Returning to main menu.');
          break;
      }
      break;
    default:
      console.log('Invalid choice. Returning to main menu.');
      break;
  }
}


function addContact() {
  console.log('--- Add Contact ---');

  const firstName = readline.question('Enter first name: ');
  validateName(firstName);

  const lastName = readline.question('Enter last name: ');
  validateName(lastName);

  const fullName = `${firstName} ${lastName}`;

  if (checkDuplicate(fullName)) {
    console.log('Contact already exists.');
    return;
  }

  const phoneNumber = readline.question('Enter phone number: ');
  validatePhone(phoneNumber);

  const email = readline.question('Enter email: ');
  validateEmail(email);

  const address = readline.question('Enter address: ');
  validateAddress(address);

  const city = readline.question('Enter city: ');
  validateCity(city);

  const state = readline.question('Enter state: ');
  validateState(state);

  const zip = readline.question('Enter ZIP code: ');
  validateZip(zip);

  const contact = new Contact(firstName, lastName, phoneNumber, email, address, city, state, zip);
  contacts.push(contact);

  console.log('Contact added successfully!');
}




function findContactByName(name) {
  const normalizedSearch = name.toLowerCase();
  return contacts.find(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(normalizedSearch);
  });
}

function editContact() {
  console.log('--- Edit Contact ---');

  if (contacts.length === 0) {
    console.log('Address book is empty.');
    return;
  }

  const searchName = readline.question('Enter the name of the contact to edit: ');
  const contactToEdit = findContactByName(searchName);

  if (!contactToEdit) {
    console.log('Contact not found.');
    return;
  }

  console.log('Contact found:');
  console.log(contactToEdit);

  const newFirstName = readline.question('Enter new first name (leave empty to keep existing): ');
  if (newFirstName.trim() !== '') {
    validateName(newFirstName);
    contactToEdit.firstName = newFirstName;
  }

  const newLastName = readline.question('Enter new last name (leave empty to keep existing): ');
  if (newLastName.trim() !== '') {
    validateName(newLastName);
    contactToEdit.lastName = newLastName;
  }

  const newPhoneNumber = readline.question('Enter new phone number (leave empty to keep existing): ');
  if (newPhoneNumber.trim() !== '') {
    validatePhone(newPhoneNumber);
    contactToEdit.phoneNumber = newPhoneNumber;
  }

  const newEmail = readline.question('Enter new email (leave empty to keep existing): ');
  if (newEmail.trim() !== '') {
    validateEmail(newEmail);
    contactToEdit.email = newEmail;
  }

  const newAddress = readline.question('Enter new address (leave empty to keep existing): ');
  if (newAddress.trim() !== '') {
    validateAddress(newAddress);
    contactToEdit.address = newAddress;
  }

  const newCity = readline.question('Enter new city (leave empty to keep existing): ');
  if (newCity.trim() !== '') {
    validateCity(newCity);
    contactToEdit.city = newCity;
  }

  const newState = readline.question('Enter new state (leave empty to keep existing): ');
  if (newState.trim() !== '') {
    validateState(newState);
    contactToEdit.state = newState;
  }

  const newZip = readline.question('Enter new ZIP code (leave empty to keep existing): ');
  if (newZip.trim() !== '') {
    validateZip(newZip);
    contactToEdit.zip = newZip;
  }

  console.log('Contact edited successfully!');
}

function deleteContact() {
  console.log('--- Delete Contact ---');

  if (contacts.length === 0) {
    console.log('Address book is empty.');
    return;
  }

  const searchName = readline.question('Enter the name of the contact to delete: ');
  const contactToDelete = findContactByName(searchName);

  if (!contactToDelete) {
    console.log('Contact not found.');
    return;
  }

  const index = contacts.indexOf(contactToDelete);
  contacts.splice(index, 1);

  console.log('Contact deleted successfully!');
}

function countContacts() {
  console.log('--- Count Contacts ---');

  const contactCount = contacts.reduce(count => count + 1, 0);

  console.log(`Number of contacts: ${contactCount}`);
}

while (true) {
  console.log('\n----- Address Book -----');
  console.log('1. Add Contact');
  console.log('2. Display Contacts');
  console.log('3. Edit Contact');
  console.log('4. Delete Contact');
  console.log('5. Count Contacts');
  console.log('6. Quit');

  const choice = readline.question('Enter your choice (1-6): ');

  switch (choice) {
    case '1':
      try {
        addContact();
      } catch (error) {
        console.log('Error:', error.message);
      }
      break;
    case '2':
      displayContacts();
      break;
    case '3':
      editContact();
      break;
    case '4':
      deleteContact();
      break;
      case '5':
        countContacts();
        break;
    case '6':
      console.log('Goodbye!');
      process.exit(0);
    default:
      console.log('Invalid choice. Please try again.');
  }
}
