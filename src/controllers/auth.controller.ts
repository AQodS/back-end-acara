import { Request, Response } from "express";
import UserModel, { userDTO, userLoginDTO } from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

export default {
  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } = req.body;

    try {
      await userDTO.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      response.success(res, result, "Success registration");
    } catch (error) {
      response.error(res, error, "Failed registration");
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    try {
      // ambil data user berdasarkan "identifier" -> email / username
      await userLoginDTO.validate({
        identifier,
        password,
      });

      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
        isActive: true,
      });

      if (!userByIdentifier) {
        return response.unauthorized(res, "User not found");
      }

      // validasi password
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return response.unauthorized(res, "User not found");
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, token, "Login success");
    } catch (error) {
      response.error(res, error, "Login failed");
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      response.success(res, result, "Success get user profile");
    } catch (error) {
      response.error(res, error, "Failed get user profile");
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };
      const user = await UserModel.findOneAndUpdate(
        { activationCode: code },
        { isActive: true },
        { new: true }
      );
      response.success(res, user, "User Successfully Activated");
    } catch (error) {
      response.error(res, error, "User is Failed Activated");
    }
  },
};
