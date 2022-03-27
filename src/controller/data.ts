import { Request, Response, NextFunction } from "express";
import data from "../models/schema";
import { sentence } from "txtgen";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/wrapAsync";
import appError from "../utils/AppError";

const createToken = (id: string) => {
  const token = jwt.sign({ id: id }, process.env.KEY);
  return token;
};

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(new appError("not authorized", 404));
    }
    const { id } = jwt.verify(token, process.env.KEY) as JwtPayload;
    if (!id) {
      return next(new appError("account not found", 404));
    }
    const user = await data.findById(id);
    if (!user) {
      return next(new appError("account not found", 404));
    }

    next();
  }
);

const findUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await data.findOne({ UID: req.body.UID });
    // console.log(user)
    if (user) {
      const token = createToken(user._id);
      res.status(201).json({
        ok: true,
        data: {
          user: user,
        },
        message: "welcome back user",
        token,
      });
    } else {
      next();
    }
  }
);

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await data.find();
    res.status(201).json({
      ok: true,
      data: users,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: "something went wrong try again later",
    });
  }
};

const postData = async (req: Request, res: Response) => {
  try {
    const newUser = await data.create(req.body);
    const token = createToken(newUser.id);

    if (!newUser) {
      return res.status(404).json({
        ok: false,
        message: "could not create new user",
      });
    }
    return res.status(201).json({
      ok: true,
      data: {
        user: newUser,
        token,
      },
      message: "user created successfully",
    });
  } catch (e) {
    return res.status(404).json({
      ok: false,
      error: "something went wrong try again later",
    });
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const datas = await data.findById(id);
    if (!datas) {
      res.status(404).json({
        ok: false,
        message: "user does not exist",
      });
    }
    const token = createToken(id);
    res.status(201).json({
      ok: true,
      datas,
      token,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
    });
  }
};

const updateScore = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await data.findById(id);
    console.log(req.body)
    if (!user) {
      return next(new appError("user not found", 404));
    }
    const {score} = req.body;    
    console.log(score)
    if (user?.score) {
      if (user.score >= score) {
        return next(
          new appError("new score is less than the current score",201)
        );
      }
    }
      const up = await data.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({
        ok: true,
        data: up,
        message: "Score updated",
      });

  }
);
const sendData = async (req: Request, res: Response) => {
  try {
    const word = sentence();
    const secondword = sentence();

    const newWord = word + " " + secondword;
    const data = await newWord;
    res.status(200).json({
      ok: true,
      data,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: e,
    });
  }
};
const deleteAccount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return next(new appError("account not found", 401));
    }
    await data.findByIdAndDelete(id);
    res.status(201).json({ ok: true, message: "account deleted successfully" });
  }
);

export {
  sendData,
  updateScore,
  getOneUser,
  postData,
  getAllUsers,
  protect,
  deleteAccount,
  findUser,
};
