import { Tool } from "./tools.types";

export const tools: Tool[] = [
  {
    type: "function",
    function: {
      name: "updateAccount",
      description: `You have a ability to call updateAccount , you need to call that tool when user asks for account balance updation
The user is requesting to update the account balance. The user will provide either a name or a user ID.

If the name is provided, use the "updateAccount" tool with the name and new balance.
If the user ID is provided, use the "updateAccount" tool with the user ID and new balance.

Example Parameters for updateAccount tool:
- name: "John" or
- userId: 123

- newBalance: 500

Please proceed with updating the account balance.
Update account balance for a user by Name or userId. Either name or userId is required. If the name is provided and multiple users with the same name are found, the operation will request the userId for confirmation before proceeding.`,
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
        oneOf: [{ required: ["name"] }],
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
