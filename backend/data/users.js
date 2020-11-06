import bcrypt from "bcryptjs";
const users = [
  {
    name: "John Barnes Oduro Twumasi",
    email: "ohenesetwumasi@gmail.com",
    password: bcrypt.hashSync("atrady2020", 10),
    isAdmin: true,
  },
  {
    name: "Nana Kwame Oduro Twumasi",
    email: "kwame@atrady.com",
    password: bcrypt.hashSync("flits2020", 10),
  },
  {
    name: "Bernard Frimpong",
    email: "kaypirlo@gmail.com",
    password: bcrypt.hashSync("pirlo2020", 10),
  },
];

export default users;
