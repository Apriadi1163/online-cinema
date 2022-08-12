const { film, user, category, filmCategory } = require("../../models")

exports.addFilm = async (req, res) => {
    try{
        let { categoryId } = req.body;

        if (categoryId) {
            categoryId = categoryId.split(',');
        }

        const data = {
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            image: req.file.filename,
            attache: req.body.attache,
            idUser: req.user.id,
        };

        let newFilm = await film.create(data);

        if (categoryId){
            const filmCategoryData = categoryId.map((item) => {
                return { idFilm: newFilm.id, idCategory: parseInt(item)};
            });

            await filmCategory.bulkCreate(filmCategoryData);
        }

        let filmData = await film.findOne({
            where:{
                id: newFilm.id,
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes:{
                        exclude: [ "createdAt", "updatedAt", "password" ],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: filmCategory,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        filmData = JSON.parse(JSON.stringify(filmData));

        res.send({
            status: "success",
            data: {
                ...filmData,
                image: process.env.PATH_FILE + filmData.image,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        });
    }
};

exports.getFilms = async (req, res) => {
    try{
        let data = await film.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                },
                
                
            ],
            attributes:{
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        data = data.map((item) => {
            return { 
                ...item, 
                image: process.env.PATH_FILE + item.image,
            };
        });

        res.status(200).send({
            status: "success",
            data,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
}

exports.getFilm = async (req, res) => {
    try{
        const { id } = req.params;
        let data = await film.findOne({
            where:{
                id,
            },
            include: [
                {
                    model: user,
                    as : "user",
                    attributes:{
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through:{
                        model: filmCategory,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],

            attributes:{
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        data = {
            ...data,
            image: process.env.PATH_FILE + data.image,
        };

        res.send({
            status: "success",
            data,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.updateFilm = async (req, res) => {
   const { id } = req.params;
   try{
    const data = req.body;

    let updateFilm = await film.update({
        ...data,
        image: req.file.filename,
        idUser: req.user.id,
    },
    {where:{id}}
    );

    updateFilm = JSON.parse(JSON.stringify(data));

    updateFilm = {
        ...updateFilm,
        image: process.env.PATH_FILE + req.file.filename,
    };

    res.status(200).send({
        status: "success",
        message: `Update filme at id: ${id} success`,
        updateFilm,
    });
   }catch(error){
    console.log(error)
    res.send({
        status:"failed",
        message: "server error",
    })
   }
}

exports.deleteFilm = async (req, res) => {
    try{
        const { id } = req.params;

        await film.destroy({
            where:{
                id,
            },
        });

        await filmCategory.destroy({
            where:{
                idFilm: id,
            },
        });

        res.send({
            status: "success",
            message: `Delete film id: ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
}