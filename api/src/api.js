const { default: axios } = require("axios");
const { TemperamentsType } = require("./db.js");
const { DogCreated } = require("./db.js");

module.exports = {
  askByName: (name) => {
    let cont = axios
      .get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .then((resultado) => (resultado = resultado.data))
      //   .then((result) => (console.log(result)))
      .then((resort) => {
        let amigo = [];
        resort.map((elm) =>
          amigo.push({
            id: elm.id,
            name: elm.name,
            weight: elm.weight.metric,
            height: elm.height.metric,
            img: `https://cdn2.thedogapi.com/images/${elm.reference_image_id}.jpg`,
            temperament: elm.temperament,
            years: elm.life_span,
          })
        );

        // console.log("AAAAAAAAAA", cont);
        return amigo;
      });
    return cont;
  },

  askById: (id) => {
    let cont = axios
      .get(`https://api.thedogapi.com/v1/breeds`)
      .then((resultado) => (resultado = resultado.data))
      .then((resort) => {
        let amigo = [];
        resort.map((elm) =>
          amigo.push({
            id: elm.id,
          })
        );
        console.log("AAAAAAAAAA", cont);
        return amigo;
      });

    return cont;
  },

  async createDog(req, res) {
    const { name, height, weight, years, img, temperament } = req.body;

    try {
      const [key, value] = await DogCreated.findOrCreate({
        where: { name },
        defaults: {
          height,
          weight,
          years,
          img,
        },
      });
      const typos = await TemperamentsType.findAll({
        where: { temperament },
      });
      await key.addTemperamentsTypes(typos);
      res.json(key);
    } catch (e) {
      console.log("error", e);
    }
  },
};
