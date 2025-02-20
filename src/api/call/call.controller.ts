import { Request, Response } from "express";
import { callService } from "./call.service";
import { errorResponse, sendSuccessResponse } from "../../utils/apiResponse";
import { CallDataSchema } from "./call.dto";


export const makeCallController = async (req: Request, res: Response) => {
  try {
    const validatedData = CallDataSchema.parse(req.body);
    const response = await callService.makeCall(validatedData);
    sendSuccessResponse({ res, data: response });
  } catch (error) {
    errorResponse({ req, res, error, statusCode: 500 });
  }
};
