
import {Request,Response} from 'express';
import data from "../models/schema"
import {sentence } from "txtgen"

// console.log(newWord);

const getAllUsers = async ( req:Request,res:Response) => {
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
      problem: e,
    });
  }
};
const postData = async (req:Request, res:Response) => {
  try {
    const newUser = await data.create(req.body);
    res.status(201).json({
      ok: true,
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: "something went wrong try again later",
      problem: e,
    });
  }
};

const getOneUser = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const datas = await data.findOne({ _id: id });

    res.status(201).json({
      ok: true,
      datas,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
    });
  }
};

const updateScore = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const up = await data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      ok: true,
      data: up,
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
    });
  }
};

const sendData = async ( req: Request, res: Response) => {
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

export  {sendData ,updateScore,getOneUser,postData,getAllUsers};