import Serie from "../models/Serie";
import verify from "../verifyToken";
import { Router } from "express";

const SeriesRouter = Router();

//CREATE
SeriesRouter.post("/", verify, async (req: any, res: any) => {
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
SeriesRouter.put("/:id", verify, async (req: any, res: any) => {
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
SeriesRouter.delete("/:id", verify, async (req: any, res: any) => {
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
SeriesRouter.get("/:id", verify, async (req: any, res: any) => {
  try {
    const serie = await Serie.findById(req.params.id);
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RANDOM
SeriesRouter.get("/random/serie", verify, async (req: any, res: any) => {
  try {
    let serie = await Serie.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
SeriesRouter.get("/", verify, async (req: any, res: any) => {
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

export default SeriesRouter;
