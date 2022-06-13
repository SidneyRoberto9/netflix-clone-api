import CryptoJS from 'crypto-js';
import { Router } from 'express';

import User from '../models/User';
import verify from '../verifyToken';

const UsersRouter = Router();

//UPDATE
UsersRouter.put('/:id', verify, async (req: any, res: any) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can update only your account!');
  }
});

//DELETE
UsersRouter.delete('/:id', verify, async (req: any, res: any) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can delete only your account!');
  }
});

//GET
UsersRouter.get('/find/:id', async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = JSON.parse(JSON.stringify(user));
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
UsersRouter.get('/', verify, async (req: any, res: any) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to see all users!');
  }
});

//verify user email
UsersRouter.get('/email/:email', async (req: any, res: any) => {
  try {
    const users = await User.find({ email: req.params.email });
    if (users.length > 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
UsersRouter.get('/stats', async (req: any, res: any) => {
  const today = new Date();
  const latYear = today.setFullYear(today.getFullYear() - 1);

  const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update isAdmin
UsersRouter.get('/:id/:value', verify, async (req: any, res: any) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { isAdmin: req.params.value },
        },
        { new: true }
      );

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can update only your account!');
  }
});

export default UsersRouter;
