const express = require("express");
const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const routes = express.Router();
const { DogCreated, TemperamentsType } = require("../db.js");
const { askByName, createDog } = require("../api.js");
const { or } = require("sequelize");


routes.get("/dogs", async (req, res) => {
  let { name } = req.query;
  if (name !== undefined) {
    let test = await askByName(name);
    // console.log("test: ", test)
    let DB = await DogCreated.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `${name}%`,
        },
      },
      include: TemperamentsType,
    });
    // console.log(DB)
    const papas = [];
    for (let x = 0; x < DB.length; x++) {
      papas.push({
        temperament: DB[x].TemperamentsTypes.map(
          (elemento) => elemento.temperament
        ),
      });
    }
    // console.log("PAAAAAAAAAAPAS: ", papas)
    // console.log("DBBBBBB: ", DB)

    let location = 0;
    // console.log("DB antes del condicional : ", DB)
    if (DB.length !== 0) {
      // console.log("db: ", DB)
      // DB.map((e)=> (console.log(e.name)))
      let cont = DB.map((e) => ({
        name: e.name,
        id: e.id,
        weight: e.weight,
        height: e.height,
        years: e.years,
        img: e.img,
        temperament: papas[location++].temperament.join(", "),

        // temperament2: e.TemperamentsTypes, //esto hay que mapearlo
      }));
      const arrlength = cont.length;
      // console.log("CONTADROD _Ñ:", cont.length)
      for (let z = 0; z <= arrlength; z++) {
        if (cont.length !== 0) {
          // console.log("CONTADOR",arrlength)
          test.push(cont.pop());
          // console.log("push", test)
        }
      }

      if (test.length === 0) {
        res.status(400).json({ error: "bad request..." });
      } else {
        res.json(test);
      }
    } else if (test.length !== 0) {
      res.json(test);
    } else {
      res.status(400).json({ error: "bad request..." });
    }
  } else {
    const DBdogs = await DogCreated.findAll({
      include: TemperamentsType,
    });
    const papas = [];
    for (let x = 0; x < DBdogs.length; x++) {
      papas.push({
        temperament: DBdogs[x].TemperamentsTypes.map(
          (elemento) => elemento.temperament
        ),
      });
    }
    // console.log("join: ",papas[0].temperament);
    const DBdogos = [];
    for (let j = 0; j < DBdogs.length; j++) {
      DBdogos.push({
        id: DBdogs[j].id,
        name: DBdogs[j].name,
        weight: DBdogs[j].weight,
        height: DBdogs[j].height,
        img: DBdogs[j].img,
        years: DBdogs[j].years,
        temperament: papas[j].temperament.join(", "),
      });
    }

    const APIdogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    // console.log("apidgos: ", APIdogs)
    const results = APIdogs.data;
    // console.log(APIdogs)
    const Apidogos = [];
    for (let i = 0; i < results.length; i++) {
      Apidogos.push({
        id: results[i].id,
        name: results[i].name,
        weight: results[i].weight.metric,
        height: results[i].height.metric,
        img: results[i].image.url,
        years: results[i].life_span,
        temperament: results[i].temperament || "not temp found",
      });
    }

    const dogs = await DBdogos.concat(Apidogos);
    res.send(dogs);
  }
});

routes.get("/temps", async (req, res) => {
  var check = await TemperamentsType.findAll();

  if (check.length === 0) {
    var tempAPI = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    var tempList = await tempAPI.data
      .map((n) => n.temperament)
      .join()
      .split(", ")
      .join()
      .split(",");
    // console.log(tempList)
    for (i = 0; i < tempList.length; i++) {
      await TemperamentsType.findOrCreate({
        where: { temperament: tempList[i] },
      });
    }
  }

  var temp = await TemperamentsType.findAll();
  res.json(temp);
});

routes.route("/dogs/:id").get(async (req, res) => {
  const id = req.params.id;
  // let { name } = req.query
  // console.log("id unu: " , id)

  const APIdogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const results = APIdogs.data;

  const Apidogos = [];
  for (let i = 0; i < results.length; i++) {
    Apidogos.push({
      id: results[i].id,
      name: results[i].name,
      weight: results[i].weight.metric,
      height: results[i].height.metric,
      img: results[i].image.url,
      temperament: results[i].temperament,
      years: results[i].life_span,
    });
  }

  if (isNaN(id)) {
    try {
      const DBdogs = await DogCreated.findAll({
        where: { id: id },
        include: TemperamentsType,
      });
      const papas = [];
      for (let x = 0; x < DBdogs.length; x++) {
        papas.push({
          temperament: DBdogs[x].TemperamentsTypes.map(
            (elemento) => elemento.temperament
          ),
        });
      }
      // console.log("join: ",papas[0].temperament);
      const DBdogos = [];
      for (let j = 0; j < DBdogs.length; j++) {
        DBdogos.push({
          id: DBdogs[j].id,
          name: DBdogs[j].name,
          weight: DBdogs[j].weight,
          height: DBdogs[j].height,
          img: DBdogs[j].img,
          years: DBdogs[j].years,
          temperament: papas[j].temperament.join(", "),
        });
      }

      return res.json(DBdogos);
    } catch (e) {
      // console.log("errorsete: ", e)
    }
  }

  if (id !== null || id !== undefined) {
    var doggo = await Apidogos.find((dog) => dog.id === parseInt(id));
    // console.log("dogo:" , doggo)
  }
  if (doggo === null || doggo === undefined) {
    return res.send(404);
  }
  return res.send(doggo);
});

routes.post("/create", createDog);

module.exports = routes;
