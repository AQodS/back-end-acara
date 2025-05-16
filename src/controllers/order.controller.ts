import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import OrderModel, { orderDAO, TypeOrder } from "../models/order.model";
import TicketModel from "../models/ticket.model";
import { FilterQuery } from "mongoose";

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
      const buildQuery = (filter: any) => {
        let query: FilterQuery<TypeOrder> = {};

        if (filter.search) query.$text = { $search: filter.search };

        return query;
      };

      const { limit = 10, page = 1, search } = req.query;

      const query = buildQuery({
        search,
      });

      const result = await OrderModel.find(query)
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .sort({ cratedAt: -1 })
        .lean()
        .exec();

      const count = await OrderModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          current: +page,
          total: count,
          totalPages: Math.ceil(count / +limit),
        },
        "Success find all orders"
      );
    } catch (error) {
      response.error(res, error, "Failed to find all orders");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { orderId } = req.params;
      const result = await OrderModel.findOne({
        orderId,
      });

      if (!result) return response.notFound(res, "Order not found");

      response.success(res, result, "Success find one an order");
    } catch (error) {
      response.error(res, error, "Failed to find one an order");
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
