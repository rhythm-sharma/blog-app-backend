import catchAsync from "../utils/catchAsync.js";
import { authService } from "../services/index.js";

const login = catchAsync(async (req, res) => {
  authService.saveUser(req, res);
});

export default {
  login,
};
