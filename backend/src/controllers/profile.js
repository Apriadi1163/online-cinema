const { profile, user } = require("../../models")

exports.addProfile = async (req, res) => {
    try {
        let data = req.body
        const addProfile = await profile.create({
            ...data,
            idUser: req.user.id
        })

        console.log(addProfile)

        res.status(200).send({
            status: "Success",
            message: "Add profile success",
            data: {
                profile: {
                    addProfile
                }
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

exports.getProfile = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await profile.findOne({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      // image: data.image ? process.env.PATH_FILE + data.image : null,
    };

    res.send({
      status: "success...",
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