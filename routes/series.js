const router = require("express").Router();
const Serie = require("../models/Serie");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newSerie = new Serie(req.body);

    try {
      const savedSerie = await newSerie.save();
      res.status(201).json(savedSerie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedSerie = await Serie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedSerie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Serie.findByIdAndDelete(req.params.id);
      res.status(200).json("The Serie has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/:id", verify, async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RANDOM
router.get("/random/serie", verify, async (req, res) => {
  try {
    let serie = await Serie.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const serie = query
        ? await Serie.find().sort({ _id: -1 }).limit(5)
        : await Serie.find();
      res.status(200).json(serie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
