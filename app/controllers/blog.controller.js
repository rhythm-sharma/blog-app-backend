import catchAsync from "../utils/catchAsync.js";
import { blogService } from "../services/index.js";

const create = catchAsync(async (req, res) => {
  blogService.create(req, res);
});

const update = catchAsync(async (req, res) => {
  blogService.update(req, res);
});

const get = catchAsync(async (req, res) => {
  blogService.get(req, res);
});

const getAll = catchAsync(async (req, res) => {
  blogService.getAll(req, res);
});

const remove = catchAsync(async (req, res) => {
  blogService.remove(req, res);
});

export default {
  create,
  update,
  get,
  getAll,
  remove,
};
