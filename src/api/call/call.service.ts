import axios from "axios";
import { env } from "../../config/env.config";
import { CallData, CallResponse } from "./call.types";

const API_BASE_URL = env.app.BLAND_AI_URL;
const API_KEY = env.app.BLAND_AI_API_KEY;

export const callService = {
  async makeCall(data: CallData): Promise<CallResponse> {
    try {
      const response = await axios.post<CallResponse>(
        `${API_BASE_URL}/calls`,
        {
          phone_number: data.phone,
          task: `You are calling ${data.name} on behalf of MBank Customer Support. Provide clear information about ${data.task} and assist in resolving the customer's query. Keep the conversation interactive, engaging, and concise.`,
          voice_id: 0,
          language: "eng",
          request_data: {
            customer_name: data.name,
            reference_number: "123",
          },
          record: true,
          reduce_latency: true,
          amd: true,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error:", error?.response?.data || error);
      throw new Error(
        error?.response?.data?.message || "Failed to make the call."
      );
    }
  },
};
