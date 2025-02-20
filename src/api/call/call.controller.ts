import { Request, Response } from "express";
import { callService } from "./call.service";
import { CallData } from "./call.dto";
import { errorResponse, sendSuccessResponse } from "../../utils/apiResponse";

export const makeCallController = async (req: Request, res: Response) => {
  const { name, phone, task } = req.body;

  if (!name || !phone || !task) {
    errorResponse({ req, res, error: "Missing required fields", statusCode: 400, });
    return;
  }

  try {
    const callData: CallData = { name, phone, task };
    const response = await callService.makeCall(callData);
    sendSuccessResponse({
      res, data: response, message: "Call initiated successfully",
    });
  } catch (error) {
    errorResponse({ req, res, error, statusCode: 500 });
  }
};
