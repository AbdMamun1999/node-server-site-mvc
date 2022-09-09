const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllTools = async (req, res, next) => {
  /* const { ip, query, params, body, headers } = req;
  console.log(ip, query, params, body, headers); */

  // kono kichu download korar jonno
  //   res.download(__dirname + '/tools.coltroller.js')
  //   res.json({ "name": "abc " });
  // res.redirect('/login')

  try {
    const { limit, page } = req.query;
    const db = getDb();
    // cursor => toArray(), forEach()
    const tool = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 })
      .skip(Number(page) * limit)
      .limit(+limit)
      .toArray();
    /*  const tool = await db
      .collection("tools")
      .find(
        {},{projection: { _id: 0 },}
      )
      .project({ _id: 0 })
      .skip(2)
      .limit(1)
      .toArray(); */
    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.saveATools = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection("tools").insertOne(tool);
    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }

    res
      .status(200)
      .send({ success: true, message: `Tool added with id: ${insertedId}` });
  } catch (error) {
    next(error);
  }
};

module.exports.toolsDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Not a valid tool id` });
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });

    if (!tool) {
      return res
        .status(400)
        .json({ success: false, error: `Could not find a tool with this id` });
    }

    res.status(200).send({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Not a valid tool id` });
    }

    const tool = await db.collection("tools").updateOne(
      // { quantity: { $exists: false } },
      { _id: ObjectId(id) },
      { $set: req.body }
    );

    if (!tool.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Could not update the tool` });
    }

    if (!tool.matchedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Could not find the tool` });
    }

    res
      .status(200)
      .send({ success: true, message: "Successfully updated the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.replaceTools = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const newData = tools.find((tool) => tool.id === Number(id));
  newData.name = req.body.name;
  res.send(newData);
};

module.exports.deleteTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Not a valid tool id` });
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });

    if (!tool.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Could not delete the tool` });
    }

    res
      .status(200)
      .send({ success: true, message: "Successfully deleted the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.test = async (req, res, next) => {
  for (let i = 0; i < 100000; i++) {
    const db = getDb();
    db.collection("test").insertOne({ name: `test ${i}`, age: i });
  }
};

module.exports.testGet = async (req, res, next) => {
  const db = getDb();
  const result = await db.collection("test").find({ age: 99999 }).toArray();
  res.json(result);
};

/* module.exports = {
    getAllTools,
    saveATools
} */
