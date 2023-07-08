const readline = require('readline-sync');

class Contact {
  constructor(firstName, lastName, phoneNumber, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

const contacts = [];

function addContact() {
  console.log('--- Add Contact ---');

  const firstName = readline.question('Enter first name: ');
  const lastName = readline.question('Enter last name: ');
  const phoneNumber = readline.question('Enter phone number: ');
  const email = readline.question('Enter email: ');

  const contact = new Contact(firstName, lastName, phoneNumber, email);
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
      addContact();
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
