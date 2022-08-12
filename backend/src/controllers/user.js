const { user, profile } = require("../../models")

exports.addUser = async (req, res) => {
    try{
        await user.create(req.body);

        res.send({
            status: "success",
            message: "Add user finished",
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.getUsers = async (req, res) => {
    try{
        const users = await user.findAll({
            include:{
                model: profile,
                as: "profile",
                attributes:{
                    exclude:["createdAt", "updatedAt", "idUser"],
                },
            },

            attributes: {
                exclude:["password", "createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "success",
            data: {
                users,
            },
        });
    }catch(error){
        console.log(error);
        res.status({
            status: "failed",
            message: "server error",
        });
    }
};

exports.getUser = async (req, res) => {
    try{
        const { id } = req.params;

        const data = await user.findOne({
            where:{
                id,
            },
            include:{
                model: profile,
                as: "profile",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser"],
                },
            },
            attributes:{
                exclude:["password", "createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "success",
            data:{
                user: data,
            },
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        await user.update(req.body, {
            where:{
                id,
            },
        });

        res.send({
            status: "success",
            message: `Update user id: ${id} finished`,
            data: req.body,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
};

exports.deleteUser = async(req, res) => {
    try{
        const { id } = req.params;

        await user.destroy({
            where:{
                id,
            },
        });

        res.send({
            status: "success",
            message: `Delete user id: ${id} finished`,
        });
    }catch(error){
        console.log(error);
        res.send({
            status: "failed",
            message: "server error",
        });
    }
}