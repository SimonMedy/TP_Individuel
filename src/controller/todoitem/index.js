const todoItemModel = require("../../model/todoitem");

exports.getAll = async (req, res) => {
  return res
    .status(200)
    .json({ msg: "OK", todoitem: await todoItemModel.findAll() });
};

exports.create = async (req, res) => {
  const { nom, description, todoListId } = req.body;
  try {
    const todoitem = await todoItemModel.create({
      nom,
      description,
      todoListId,
    });
    if (!todoitem.id) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", todoitem: todoitem.dataValues });
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
    const { nom, description, statut } = req.body;
    const { uuid } = req.params;
    const todoitem = await todoItemModel.update(
      {
        nom,
        description,
        statut,
      },
      { where: { id: uuid } }
    );
    return res.status(200).json({ msg: "OK", todoitem });
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
    const todoitem = await todoItemModel.destroy({ where: { id: uuid } });
    console.log(todoitem);
    if (!todoitem) {
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
    const todoitem = await todoItemModel.findOne({
      include: [
        {
          association: "todoItem_belongsTo_todolist",
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
      where: { id: uuid },
      attributes: {
        exclude: ["createdAt"],
      },
    });
    console.log(todoitem.dataValues);
    if (!todoitem) {
      res.status(400).json({ msg: "BAD REQUEST" });
    }
    return res.status(200).json({ msg: "OK", todoitem: todoitem.dataValues });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ msg: "BAD REQUEST" + e.message });
  }
};