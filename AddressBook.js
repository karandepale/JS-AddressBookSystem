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
    throw new Error('Invalid ZIP code. ZIP code should be 5 digits.');
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

function addContact() {
  console.log('--- Add Contact ---');

  const firstName = readline.question('Enter first name: ');
  validateName(firstName);

  const lastName = readline.question('Enter last name: ');
  validateName(lastName);

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

function displayContacts() {
  console.log('--- Display Contacts ---');

  if (contacts.length === 0) {
    console.log('Address book is empty.');
    return;
  }

  console.log('Contacts in the address book:');
  contacts.forEach(contact => {
    console.log(contact);
  });
}

while (true) {
  console.log('\n----- Address Book -----');
  console.log('1. Add Contact');
  console.log('2. Display Contacts');
  console.log('3. Quit');

  const choice = readline.question('Enter your choice (1-3): ');

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
      console.log('Goodbye!');
      process.exit(0);
    default:
      console.log('Invalid choice. Please try again.');
  }
}
