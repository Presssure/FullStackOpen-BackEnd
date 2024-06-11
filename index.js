const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

// allows cross origin resource sharing
app.use(cors());

// json parser
app.use(express.json());
// app.use(morgan("tiny"));

// allows the backend to serve static pages
app.use(express.static("dist"));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const time = new Date();
  console.log(time);
  response.send(`<p>Phonebook has info for 2 people <br/> ${time}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statuseMessage = "Person id does not exist";
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 99999999 + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // console.log(body);
  if (!body.name) {
    return response.status(400).json({ error: "missing name" });
  } else if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  } else if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number ? body.number : "",
  };
  persons = persons.concat(person);
  response.json(person);
});

// Use port 3001 if the port var is undefined
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
