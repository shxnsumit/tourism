const yargs = require('yargs');
const chalk = require('chalk');

// Sample contacts array
const contacts = [
  { name: 'John', number: '+1 123-456-7890' },
  { name: 'Alice', number: '+1 234-567-8901' },
  { name: 'Bob', number: '+91 98765 43210' },
  { name: 'Charlie', number: '+91 87654 32109' },
  { name: 'David', number: '+44 1234 567890' },
  { name: 'Emily', number: '+44 9876 543210' },
  { name: 'Frank', number: '+1 345-678-9012' },
  { name: 'Grace', number: '+91 76543 21098' },
  { name: 'Hannah', number: '+44 3456 789012' },
  { name: 'Ivy', number: '+44 6789 012345' }
];

// Parse command line arguments
const argv = yargs
  .options({
    'country1': { 
      alias: 'c1',
      description: 'Country code for the first country',
      demandOption: true
    },
    'country2': {
      alias: 'c2',
      description: 'Country code for the second country',
      demandOption: true
    },
    'country3': {
      alias: 'c3',
      description: 'Country code for the third country',
      demandOption: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// Function to segregate contacts by country code
function segregateContacts(contacts, countryCodes) {
  const segregatedContacts = {};
  for (const countryCode of countryCodes) {
    segregatedContacts[countryCode] = [];
    for (const contact of contacts) {
      if (contact.number.startsWith(countryCode)) {
        segregatedContacts[countryCode].push(contact);
      }
    }
  }
  return segregatedContacts;
}

// Segregate contacts by country code
const segregatedContacts = segregateContacts(contacts, [argv.country1, argv.country2, argv.country3]);

// Print contacts with specified formatting
for (const countryCode in segregatedContacts) {
  let countryContacts = segregatedContacts[countryCode];
  let color, style;

  // Set formatting based on country code
  if (countryCode === argv.country1) {
    color = chalk.bold;
    style = chalk.bgBlue;
  } else if (countryCode === argv.country2) {
    color = chalk.italic;
    style = chalk.bgGreen;
  } else if (countryCode === argv.country3) {
    color = chalk.underline;
    style = chalk.bgYellow;
  } else {
    color = chalk.reset;
    style = chalk.reset;
  }

  // Print contacts with specified formatting
  console.log(style(color(`Contacts for country code ${countryCode}:`)));
  for (const contact of countryContacts) {
    console.log(color(`Name: ${contact.name}, Number: ${contact.number}`));
  }
}
