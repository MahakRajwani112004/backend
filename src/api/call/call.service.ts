import axios from "axios";

interface CallData {
  name: string;
  phone: string;
  task: string;
}

const headers = {
  Authorization:
    "Bearer org_b8ab8bfb45cc0bbac613259e2154cbaf7f0e3eb3f7a22ce13a5db482e5b71b7240e8f6b667cf76a797f069",
  "Content-Type": "application/json",
};

export const callService = {
  async makeCall(data: CallData) {
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
      const response = await axios.post(
        "https://api.bland.ai/v1/calls",
        apiData,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("API call failed");
    }
  },
};
