const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || newError();
};

const addContact = async (name, email, phone) => {
  if (name && email && phone) {
    const contacts = await getAllContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  return "You missed something";
};

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const contactToDelete = await getContactById(id);
  const index = contacts.findIndex(
    (contact) => contact.id === contactToDelete.id
  );
  if (index === -1) {
    throw new Error();
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToDelete;
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
};
