import axios, { AxiosError } from "axios";
import { env } from "../../config/env.config";
import { CallData, CallResponse } from "./call.types";

const API_BASE_URL = env.app.BLAND_AI_URL
const API_KEY= env.app.BLAND_AI_API_KEY

const AUTH_TOKEN =
  `Bearer ${API_KEY}`;

const headers = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json",
};

export const callService = {
  async makeCall(data: CallData): Promise<CallResponse> {
    const apiData = {
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
    };

    try {
      const response = await axios.post<CallResponse>(
        `${API_BASE_URL}/calls`,
        apiData,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error("API Error:", error.response.data);
        throw new Error(`API Error: ${error.response.data.message}`);
      }
      console.error("Unexpected Error:", error);
      throw new Error("Failed to make the call. Please try again later.");
    }
  },
};
