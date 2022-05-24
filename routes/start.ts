import { Router } from "express";

const startRouter = Router();

startRouter.get("", (req: any, res: any) => {
  res.send("App Works").status(200);
});

export default startRouter;
