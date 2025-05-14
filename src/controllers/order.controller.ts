import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import OrderModel, { orderDAO, TypeOrder } from "../models/order.model";
import TicketModel from "../models/ticket.model";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      const userId = req.user?.id;
      const payload = {
        ...req.body,
        createdBy: userId,
      } as TypeOrder;
      await orderDAO.validate(payload);

      const ticket = await TicketModel.findById(payload.ticket);
      if (!ticket) return response.notFound(res, "Ticket not found");
      if (ticket.quantity < payload.quantity) {
        return response.error(res, null, "Ticket is not enough");
      }

      const total: number = +ticket.price * +payload.quantity;

      Object.assign(payload, {
        ...payload,
        total,
      });

      const result = await OrderModel.create(payload);
      response.success(res, result, "Success create an order");
    } catch (error) {
      response.error(res, error, "Failed to create an order");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to find all order");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to find one order");
    }
  },
  async findAllByMember(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to find all order by member");
    }
  },

  async complete(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to complete an order");
    }
  },
  async pending(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to pending an order");
    }
  },
  async cancel(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to cancel an order");
    }
  },
};
