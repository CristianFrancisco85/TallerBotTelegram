const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");
const bot = new Telegraf("1812373471:AAF6qkN-J9TMJsTmvWyn2Y4U1H2wwPrj1gU");

//DOSG API
const API_URL2 = "https://dog.ceo/api/breeds/list/all";
let foto = "";
let razas;

fetch(API_URL2)
  .then((res) => res.json())
  .then((dog) => {
    // console.log(dog);
    razas = dog.message;
    // console.log(razas);
  });

bot.start((ctx) => {
  ctx.reply(
    `${ctx.from.first_name} ${ctx.from.last_name}, bienvenido a tu tienda de perros favorita :)`
  );

  let array = [];
  for (var raza in razas) {
    array.push(raza);
  }

  var lista = "Nuestro listado de razas de perros es el siguiente: \n";
  array.forEach((raza) => {
    lista += raza + "\n";
  });

  lista +=
    "\nIngresa el nombre de la raza del perro que deseas para que puedas ver la foto y precio de este tipo de raza";
  ctx.reply(lista);
}); // /start

bot.help((ctx) => {
  ctx.reply("Help!!");
}); // /start

bot.settings((ctx) => {
  ctx.reply("Settings");
}); // /start

bot.command(["che", "CHE", "Che"], (ctx) => {
  ctx.reply("Buenos dias Carlos Ché");
});

//CUANDO EL USUARIO TYPEA ALGO
bot.hears("computer", (ctx) => {
  ctx.reply("Hey I am selling a computer");
});

//cuando alguien menciona a otra persona @usuario
bot.mention("sergio", (ctx) => {
  ctx.reply("You mention Sergio");
});

//
bot.phone("56948653", (ctx) => {
  ctx.reply("Este es un número de telefono");
});

//
bot.hashtag("programming", (ctx) => {
  ctx.reply("hashtag!!");
});

//cuandl el usuario typea cualquier cosa
bot.on("text", (ctx) => {
  // console.log(ctx.message.text);
  raza = ctx.message.text;
  let bandera = false;
  raza = raza.toLowerCase();
  const API_URL = "https://dog.ceo/api/breed/" + raza + "/images/random";

  fetch(API_URL)
    .then((res) => res.json())
    .then((dog) => {
      foto = dog.message;
      // console.log(dog);

      if (dog.status == "error") {
        ctx.reply("La raza de perro ingresada no existe");
      } else {
        bandera = true;
        let texto = "Se muestra una foto de la raza de perro " + raza;
        ctx.reply(texto);
        ctx.replyWithPhoto(foto);
      }
    });
    
});

bot.on("sticker", (ctx) => {
  ctx.reply("OH! te gustan los stickers");
});

bot.launch(); //para iniciar el bot

function getConfirmation() {

  bot.on("text", (ctx) => {
    let confirmation = ctx.message.text;
    confirmation = confirmation.toLowerCase();
    
  });

}
