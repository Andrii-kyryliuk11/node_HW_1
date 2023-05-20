const contacts = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.getAllContacts();
        return console.table(allContacts);
      } catch {
        return console.log(`Error of loading contacts!`);
      }

    case "get":
      try {
        const oneContact = await contacts.getContactById(id);
        return console.log(oneContact);
      } catch {
        return console.log(`Can not find contact!`);
      }

    case "add":
      try {
        const addedContact = await contacts.addContact(name, email, phone);
        return console.log(addedContact);
      } catch (error) {
        return console.error(error) || console.log(`Can not add contact!`);
      }

    case "remove":
      try {
        const contactToDelete = await contacts.removeContact(id);
        return console.log(`Contact '${contactToDelete.name}' deleted!`);
      } catch {
        return console.log(`Can not remove contact!`);
      }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
