import { Tool } from "../types/common";

export const tools: Tool[] = [
  {
    type: "function",
    function: {
      name: "updateAccount",
      description:
        "Update account balance for a user by name or userId. Either name or userId is required. If the name is provided and multiple users with the same name are found, the operation will request the userId for confirmation before proceeding.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "The name of the user to update (optional, but required if userId is not provided).",
          },
          userId: {
            type: "number",
            description:
              "The unique identifier for the user to update (optional, but required if name is not provided).",
          },
          newBalance: {
            type: "number",
            description: "The new balance to set for the user.",
          },
        },
        required: ["newBalance"],
        oneOf: [{ required: ["name"] }, { required: ["userId"] }],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteAccount",
      description:
        "Delete a user account by name or userId. Either name or userId is required. If the name is provided and multiple users with the same name are found, the operation will request the userId for confirmation before proceeding.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "The name of the user to delete (optional, but required if userId is not provided).",
          },
          userId: {
            type: "number",
            description:
              "The unique identifier for the user to delete (optional, but required if name is not provided).",
          },
        },
        required: [],
        oneOf: [{ required: ["name"] }, { required: ["userId"] }],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getAccountDetails",
      description: "Get account details by name or userId.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "The name of the user to retrieve account details for (optional, but required if userId is not provided).",
          },
          userId: {
            type: "number",
            description:
              "The unique identifier for the user to retrieve account details for (optional, but required if name is not provided).",
          },
        },
        required: [],
        oneOf: [{ required: ["name"] }, { required: ["userId"] }],
      },
    },
  },
];
