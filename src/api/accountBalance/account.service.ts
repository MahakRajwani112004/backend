import AccountBalance, { IAccountBalance } from "./accountbalance.model";

type QueryType = {
  user_name?: string;
  user_id?: number;
};

export const getAccount = async (
  user_name?: string,
  userId?: number
): Promise<IAccountBalance | null> => {
  try {
    const query: QueryType = {};
    if (user_name) query.user_name = user_name;
    if (userId) query.user_id = userId;

    const account = await AccountBalance.findOne(query);
    console.log("Account Details:", account);
    return account;
  } catch (err) {
    console.error("Error getting account:", err);
    throw err;
  }
};

export const updateAccount = async (
  name?: string,
  user_id?: number,
  newBalance?: number
): Promise<IAccountBalance | null> => {
  try {
    const query: any = {};
    if (name) query.name = name;
    if (user_id) query.user_id = user_id;

    const updatedAccount = await AccountBalance.findOneAndUpdate(
      query,
      { balance: newBalance },
      { new: true }
    );
    console.log("Updated Account:", updatedAccount);
    return updatedAccount;
  } catch (err) {
    console.error("Error updating account:", err);
    throw err;
  }
};

export const deleteAccount = async (
  name?: string,
  userId?: number
): Promise<IAccountBalance | null> => {
  try {
    const query: any = {};
    if (name) query.name = name;
    if (userId) query.user_id = userId;

    const deletedAccount = await AccountBalance.findOneAndDelete(query);
    console.log("Deleted Account:", deletedAccount);
    return deletedAccount;
  } catch (err) {
    console.error("Error deleting account:", err);
    throw err;
  }
};
