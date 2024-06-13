const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("please provide password, name and number as arguments");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:FullStack3!@cluster0.9qjac5i.mongodb.net/thePhonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const phonebook = new Phonebook({
  name: process.argv[3],
  number: process.argv[4],
});

phonebook.save().then((result) => {
  console.log(phonebook.name);
  mongoose.connection.close();
});
