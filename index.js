const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      if (!id) return console.error("Please, enter the contact id!");
      const receivedContact = await getContactById(id);
      console.log(receivedContact);
      break;

    case "add":
      if (!name || !email || !phone)
        return console.error(
          "Please, enter the contact information (name/email/phone)"
        );
      const contactsWithAddedOne = await addContact(name, email, phone);
      console.table(contactsWithAddedOne);
      break;

    case "remove":
      if (!id) return console.error("Please, enter the contact id");
      await removeContact(id);
      const newListContacts = await listContacts();
      console.table(newListContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
