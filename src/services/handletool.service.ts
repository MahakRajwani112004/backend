import {
  deleteAccount,
  getAccount,
  updateAccount,
} from "../api/accountBalance/account.service";

export const handleToolCall = async (toolCall: any) => {
  if (toolCall) {
    const { name, arguments: args } = toolCall.function;
    const parsedArgs = args ? JSON.parse(args) : null;
    switch (name) {
      case "getAccountDetails":
        if (parsedArgs?.userId) {
          const account = await getAccount(parsedArgs.userId);
          console.log("Account details retrieved:", account);
          if (account) {
            return `Account details for user ID ${parsedArgs.userId} have been retrieved.`;
          } else {
            return `No account found for user ID ${parsedArgs.userId}.`;
          }
        } else if (parsedArgs?.name) {
          const account = await getAccount(parsedArgs.name);
          console.log("from handletoolService", account);

          if (account) {
            return `Account details for user ID ${parsedArgs.name} have been retrieved:
      User ID: ${account.user_id}
      User Name: ${account.user_name}
      Balance: ${account.balance}`;
          } else {
            return `No account found for the name "${parsedArgs.name}".`;
          }
        }
        break;

      case "updateAccount":
        if (parsedArgs?.userId && parsedArgs?.newBalance) {
          const updatedAccount = await updateAccount(
            parsedArgs.userId,
            parsedArgs.newBalance
          );
          console.log("Account balance updated:", updatedAccount);
          return `Account balance for user with ID ${parsedArgs.userId} has been updated to ${parsedArgs.newBalance}.`;
        } else if (parsedArgs?.name) {
          const accounts = await getAccount(parsedArgs.name);
          if (Array.isArray(accounts)) {
            if (accounts.length > 1) {
              return `Multiple accounts found for the name "${parsedArgs.name}". Please provide the user ID to proceed.`;
            } else if (accounts.length === 1 && parsedArgs?.newBalance) {
              const updatedAccount = await updateAccount(
                accounts[0].name,
                accounts[0].user_id,
                parsedArgs.newBalance
              );
              console.log("Account balance updated:", updatedAccount);
              return `Account balance for user with ID ${accounts[0].user_id} has been updated to ${parsedArgs.newBalance}.`;
            }
          } else {
            return `No accounts found for the name "${parsedArgs.name}".`;
          }
        }
        break;

      case "deleteAccount":
        if (parsedArgs?.userId) {
          const deletedAccount = await deleteAccount(
            undefined,
            parsedArgs.userId
          );
          console.log("Account deleted:", deletedAccount);
          return `Account with user ID ${parsedArgs.userId} has been deleted.`;
        } else if (parsedArgs?.name) {
          const accounts = await getAccount(parsedArgs.name);
          if (Array.isArray(accounts)) {
            if (accounts.length > 1) {
              return `Multiple accounts found for the name "${parsedArgs.name}". Please provide the user ID to proceed.`;
            } else if (accounts.length === 1) {
              const deletedAccount = await deleteAccount(
                accounts[0].name,
                accounts[0].user_id
              );
              console.log("Account deleted:", deletedAccount);
              return `Account with user ID ${accounts[0].user_id} has been deleted.`;
            }
          } else {
            return `No accounts found for the name "${parsedArgs.name}".`;
          }
        }
        break;

      default:
        console.log("No matching function for the response.");
        return "Sorry, I couldn't process that request.";
    }
  } else {
    return "Invalid tool call or missing function.";
  }
};
