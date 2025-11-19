import type { IUserOrderId } from "../../interfaces/user.js";
import getUserOrderIdRepositorie from "../../repositories/user/getUserOrderIdRepositorie.js";

const getUserOrderIdService = async (userId: number): Promise<IUserOrderId[]> => {
  if (isNaN(userId))
    throw { status: 400, message: "Invalid order ID. Expected a number" };
  const getUserOrderId = await getUserOrderIdRepositorie(userId);
  if (getUserOrderId.length === 0)
    throw { status: 404, message: "User not found." };
  return getUserOrderId;
};

export default getUserOrderIdService;
