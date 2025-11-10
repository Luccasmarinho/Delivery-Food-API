import getUserIdRepositorie from "../../repositories/user/getUserIdRepositorie.js";
import type {WithoutPass} from "../../interfaces/user.js"

const getUserIdService = async (id: number): Promise<WithoutPass> => {
  if (isNaN(id))
    throw { status: 400, message: "Invalid user ID. Expected a number" };
  const getUserId = await getUserIdRepositorie(id);
  if (!getUserId) throw { status: 404, message: "User not found." };
  const { password, ...userIdWithoutPassword } = getUserId;

  return userIdWithoutPassword;
};

export default getUserIdService;
