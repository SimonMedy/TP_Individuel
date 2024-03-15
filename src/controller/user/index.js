const { hashPassword } = require("../../utils/bcrypt");
const userModel = require("../../model/user");

exports.getAll = async (req, res) => {
  return res.status(200).json({ msg: "OK", users: await userModel.findAll() });
};

exports.create = async (req, res) => {
  const { nom, prenom, email, pseudo, password } = req.body;
  try {
    const user = await userModel.create({
      nom,
      prenom,
      email,
      pseudo,
      password: hashPassword(password),
    });
    if (!user.id) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", user: user.dataValues });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.params.uuid)
      return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
    if (!req.body)
      return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });
    const { nom, prenom, email, pseudo, password } = req.body;
    const { uuid } = req.params;
    const user = await userModel.update(
      {
        nom,
        prenom,
        email,
        pseudo,
        password: hashPassword(password),
      },
      { where: { id: uuid } }
    );
    return res.status(200).json({ msg: "OK", user: user });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.uuid)
    return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
  const { uuid } = req.params;
  try {
    const user = await userModel.destroy({ where: { id: uuid } });
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};

exports.getById = async (req, res) => {
  if (!req.params.uuid)
    return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
  const { uuid } = req.params;
  try {
    const user = await userModel.findByPk(uuid);
    console.log(user.dataValues);
    if (!user) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", user: user.dataValues });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};
