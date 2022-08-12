const { user, mylist, film } = require("../../models")

exports.getMylist = async (req, res) => {
    try {
      const idBuyer = req.user.id;
      
      let data = await mylist.findAll({
        where: {
          idBuyer,
        },
        attributes: {
          exclude: ["updatedAt", "idBuyer", "idSeller", "idProduct"],
        },
        include: [
          {
            model: film,
            as: "film",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "idUser",
              ],
            },
          },
          {
            model: user,
            as: "buyer",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "status"],
            },
          },
          {
            model: user,
            as: "seller",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "status"],
            },
          },
        ],
      });
  
      data = JSON.parse(JSON.stringify(data));
  
      data = data.map((item) => {
        return {
          ...item,
          film: {
            ...item.film,
            image: process.env.PATH_FILE + item.film.image,
          },
        };
      });
  
      res.send({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};

exports.addMylist = async (req, res) => {
    try {
      let data = req.body;
  
      data = {
        ...data,
        idBuyer: req.user.id,
      };
  
      await mylist.create(data);
  
      res.send({
        status: "success",
        message: "Add cart finished",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};

exports.getMylistDetail = async (req, res) => {
  try {

    // const idBuyer = req.user.id;
    const { id } = req.params;
    
    let data = await mylist.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "idBuyer", "idSeller", "idProduct"],
      },
      include: [
        {
          model: film,
          as: "film",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "idUser",
            ],
          },
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model: user,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    // data = {
    //   ...data,
    //   image: process.env.PATH_FILE + data.image,
      
    // }

    dataFilm = data.film
    dataFilm ={
      ...dataFilm,
      image: process.env.PATH_FILE + dataFilm.image,
    }
    // console.log(data.film.image);


    res.send({
      status: "success",
      dataFilm,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
}