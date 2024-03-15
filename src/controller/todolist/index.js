const todolistModel = require("../../model/todolist");

exports.getAll = async (req, res) => {
  return res
    .status(200)
    .json({ msg: "OK", todolist: await todolistModel.findAll() });
};

exports.create = async (req, res) => {
  const { nom, description, userId } = req.body;
  try {
    const todolist = await todolistModel.create({
      nom,
      description,
      userId,
    });
    if (!todolist.id) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", todolist: todolist.dataValues });
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
    const { nom, description } = req.body;
    const { uuid } = req.params;
    const todolist = await todolistModel.update(
      {
        nom,
        description,
      },
      { where: { id: uuid } }
    );
    return res.status(200).json({ msg: "OK", todolist });
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
    const todolist = await todolistModel.destroy({ where: { id: uuid } });
    console.log(todolist);
    if (!todolist) {
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
    const todolist = await todolistModel.findOne({
      include: [    
        {
          association: "todoList_belongsTo_user",
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
      where: { id: uuid },
      attributes: {
        exclude: ["createdAt"],
      },
    });
    console.log(todolist.dataValues);
    if (!todolist) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", todolist: todolist.dataValues });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};