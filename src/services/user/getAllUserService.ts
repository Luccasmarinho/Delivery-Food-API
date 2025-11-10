import getAllUserRepositorie from "../../repositories/user/getAllUserRepositorie.js";
import type { WithoutPass } from "../../interfaces/user.js";

const getAllUserService = async (): Promise<WithoutPass[]> => {
  const getAllUser = await getAllUserRepositorie();
  return getAllUser.map(
    ({ password, ...getAllUserWithoutPassword }) => getAllUserWithoutPassword
  );
};

export default getAllUserService;
