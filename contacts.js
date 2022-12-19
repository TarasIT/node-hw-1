const path = require("path");
const fs = require("fs").promises;
const nodeid = require("node-id");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    if (!contactId) throw "Please, enter the contact id!";

    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    if (!contactId) throw "Please, enter the contact id!";

    const contacts = await listContacts();
    const newContactsList = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId)
    );
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    if (!name || !email || !phone) {
      throw "Please, enter the contact information (name/email/phone)!";
    }

    const contacts = await listContacts();
    contacts.push({ id: nodeid(), name, email, phone });
    const newContactsList = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
