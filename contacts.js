const path = require("path");
const fs = require("fs").promises;
const nodeid = require("node-id");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf8"));

const getContactById = async (contactId) => {
  if (!contactId) return console.error("Please, enter the contact id!");
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  if (!contactId) return console.error("Please, enter the contact id!");
  const contacts = await listContacts();
  const newContactsList = JSON.stringify(
    contacts.filter((contact) => contact.id !== contactId)
  );
  await fs.writeFile(contactsPath, newContactsList, "utf8");
  return contacts;
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone)
    return console.error(
      "Please, enter the contact information (name/email/phone)!"
    );
  const contacts = await listContacts();
  contacts.push({ id: nodeid(), name, email, phone });
  const newContactsList = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, newContactsList, "utf8");
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
