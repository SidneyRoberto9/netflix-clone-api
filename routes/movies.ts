import Movie from "../models/Movie";
import verify from "../verifyToken";
import { Router } from "express";

const MovieRouter = Router();

//CREATE
MovieRouter.post("/", verify, async (req: any, res: any) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
MovieRouter.put("/:id", verify, async (req: any, res: any) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
MovieRouter.delete("/:id", verify, async (req: any, res: any) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The Movie has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
MovieRouter.get("/:id", verify, async (req: any, res: any) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RANDOM
MovieRouter.get("/random/movie", verify, async (req: any, res: any) => {
  try {
    let movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
MovieRouter.get("/", verify, async (req: any, res: any) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const movie = query
        ? await Movie.find().sort({ _id: -1 }).limit(5)
        : await Movie.find();
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

export default MovieRouter;
