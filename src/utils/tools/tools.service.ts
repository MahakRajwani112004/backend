import {
  deleteAccount,
  getAccount,
  updateAccount,
} from "../accountBalance/account.service";
import { ToolCall } from "./tools.types";

interface ParsedArgs {
  userId?: string;
  name?: string;
  newBalance?: number;
}

const extractArguments = (toolCall: ToolCall) => {
  try {
    return toolCall?.function?.arguments
      ? JSON.parse(toolCall.function.arguments)
      : null;
  } catch (error) {
    console.error("Error parsing tool arguments:", error);
    return null;
  }
};

const fetchAccountDetails = async (args: ParsedArgs) => {
  const identifier = args.userId || args.name;
  if (!identifier) return "User ID or Name is required.";

  const account = await getAccount(identifier);
  if (!account)
    return `No account found for ${
      args.userId ? `User ID ${args.userId}` : `name "${args.name}"`
    }.`;

  console.log("Account details retrieved:", account);
  return `Account details retrieved:
  - User ID: ${account.user_id}
  - Name: ${account.user_name}
  - Balance: ${account.balance}`;
};

export const handleToolCall = async (toolCall: any) => {
  if (!toolCall) return "Invalid tool call or missing function.";

  const parsedArgs = extractArguments(toolCall);
  if (!parsedArgs) return "Error parsing request parameters.";

  const { name } = toolCall.function;

  switch (name) {
    case "getAccountDetails":
      return await fetchAccountDetails(parsedArgs);

    case "updateAccount":
      if (!parsedArgs.newBalance) return "New balance is required.";

      const accounts = await getAccount(parsedArgs.name || parsedArgs.userId);
      if (!accounts)
        return `No account found for ${
          parsedArgs.name
            ? `name "${parsedArgs.name}"`
            : `User ID ${parsedArgs.userId}`
        }.`;

      if (Array.isArray(accounts) && accounts.length > 1) {
        return `Multiple accounts found for name "${parsedArgs.name}". Please provide the User ID to proceed.`;
      }

      const accountToUpdate = Array.isArray(accounts) ? accounts[0] : accounts;
      const updatedAccount = await updateAccount(
        accountToUpdate.name,
        accountToUpdate.user_id,
        parsedArgs.newBalance
      );

      console.log("Account balance updated:", updatedAccount);
      return `Account balance updated to ${parsedArgs.newBalance} for user ID ${accountToUpdate.user_id}.`;

    case "deleteAccount":
      const accountsToDelete = await getAccount(
        parsedArgs.name || parsedArgs.userId
      );
      if (!accountsToDelete)
        return `No account found for ${
          parsedArgs.name
            ? `name "${parsedArgs.name}"`
            : `User ID ${parsedArgs.userId}`
        }.`;

      if (Array.isArray(accountsToDelete) && accountsToDelete.length > 1) {
        return `Multiple accounts found for name "${parsedArgs.name}". Please provide the User ID to proceed.`;
      }

      const accountToDelete = Array.isArray(accountsToDelete)
        ? accountsToDelete[0]
        : accountsToDelete;
      await deleteAccount(accountToDelete.name, accountToDelete.user_id);

      console.log("Account deleted:", accountToDelete);
      return `Account with user ID ${accountToDelete.user_id} has been deleted.`;

    default:
      console.log("No matching function for the response.");
      return "Sorry, I couldn't process that request.";
  }
};
