const { category, filmCategory } = require("../../models");

exports.addCategory = async (req, res) => {
    try{
        const newCategory = await category.create(req.body);

        res.send({
            status: "success",
            data:{
                id: newCategory.id,
                name: newCategory.name,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
}

exports.getCategories = async (req, res) => {
    try{
        const data = await category.findAll({
            attributes:{
                exclude:["createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "success",
            data,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            ststus: "failed",
            message: "server error",
        });
    }
}

exports.getCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await category.findOne({
            where:{
                id,
            },
            attributes:{
                exclude:["createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "success",
            data,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const newCategory = await category.update(req.body, {
            where:{
                id,
            },
        });

        res.send({
            status: "success",
            data:{
                id: newCategory.id,
                name: newCategory.name,
            },
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try{
        const { id } = req.params;

        await category.destroy({
            where:{
                id,
            },
        });

        await filmCategory.destroy({
            where:{
                id,
            },
        });

        res.send({
            status: "success",
            message: `Delete category id: ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error",
        });
    }
}