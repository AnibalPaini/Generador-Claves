import { Router } from "express";
import { eliminarDiacriticos } from "../utils.js";
import zxcvbn from 'zxcvbn';

const palabrasRouter = Router();

palabrasRouter.get("/contrasena", async (req, res) => {
  const { caracteres, num, min, may, esp } = req.query;
  const numeros = "0123456789";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const especiales = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let clave = "";
  if (!num && !min && !may && !esp) {
    res.send("Debe marcar almenos 1 elemento");
  }

  let conjunto=""
  if(num==="true"){conjunto+=numeros}
  if(min==="true"){conjunto+=minusculas}
  if(may==="true"){conjunto+=mayusculas}
  if(esp==="true"){conjunto+=especiales}
  console.log(conjunto);
  
  if (conjunto!=="") {
    for (let i = 0; i < caracteres; i++) {
      const indice = Math.floor(Math.random() * conjunto.length);
      clave += conjunto[indice];
    }
  } 
  let fuerza = zxcvbn(clave).score;
  let mensjae= zxcvbn(clave).feedback 

  res.status(200).json({payload:clave, fuerza:fuerza, mensaje: mensjae });
});

palabrasRouter.get("/random", async (req, res) => {
  const { num } = req.query;
  console.log(num);

  let palabras = [];
  for (let i = 0; i < num; i++) {
    const resp = await fetch("https://rae-api.com/api/random");
    const data = await resp.json();
    palabras.push(data.data.word);
  }
  let frase=palabras.join("-")
  console.log(frase);
  frase=eliminarDiacriticos(frase)
  res.json(frase);
});

export default palabrasRouter;
