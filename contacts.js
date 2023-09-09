const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (!index) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
