//come creare un server in node js

const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // //   console.log("Reaquest made");
  // console.log(req.url, req.method); //* req i property di una richiesta

  const num = _.random(0, 20);
  console.log(num);

  res.setHeader("Content-Type", "text/html"); // response methods

  //routing in node js
  let path = "./view/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; //status code nel caso successo
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200; //status code nel caso successo
      break;
    case "/about-us": // questo page non esiste ma voglio redirect al page about
      res.setHeader("Location", "/about"); //redirecting a un page
      res.statusCode = 301; //status code nel caso di cambio indirizzo
      res.end();
      break;

    default:
      path += "404.html";
      res.statusCode = 404; //status code nel caso non esiste
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for Request on Port 3000");
});
// ora puoi scrivere in terminal: node .\server.js , e avviare il server locale, poi scrivendo localhost:3000 nel browser vado a connettermi al server e avrò Request made

//Localhost è un server locale, il mio pc
//Port number è il canale o la prota del server, ex: 3000 è local host

//* object request(req) ci da una serie di property quando mandiamo una rechiesta al server e posiamo richiamare quelli property

// ------------------------------
// passare un page al server, per esempio index.html

//usare node packages manager npm
//nodeman: per live updating del progetto

//package file: per creare un package per il progetto per passare a un'altra collega. npm init che ci da un file json come react

// package lodash:utlity lib

//express
