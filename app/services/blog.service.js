import httpStatus from "http-status";
import db from "../models/index.js";
import { decodeToken } from "../middlewares/auth.js";

const Blog = db.blog;

const create = async (req, res) => {
  const decodeTokenData = await decodeToken(req);

  const blog = {
    title: req?.body?.title || "",
    content: req?.body?.content,
    author: decodeTokenData?.email,
    published: req?.body?.published,
    background: req?.body?.background || "#2463eb",
  };

  Blog.create(blog)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message || "Some error occurred while creating the blog.",
      });
    });
};

const update = async (req, res) => {
  const decodeTokenData = await decodeToken(req);

  const id = req.body.id;

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: `Cannot update Blog with id=${id}`,
      });
    }

    const num = await Blog.update(req.body, {
      where: {
        id: id,
        author: decodeTokenData?.email,
      },
    });

    if (num == 1) {
      return res.send({
        message: "Blog was updated successfully.",
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: `Cannot update Blog with id=${id}`,
      });
    }
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message || "Some error occurred while updating the blog.",
    });
  }
};

const get = async (req, res) => {
  const id = req?.params?.id;

  Blog.findByPk(id)
    .then((data) => {
      if (!data) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: `Blog with id=${id} not found`,
        });
      } else {
        return res.send(data);
      }
    })
    .catch(() => {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: "Error retrieving Blog with id=" + id,
      });
    });
};

const getAll = async (req, res) => {
  try {
    const decodeTokenData = await decodeToken(req);

    const allBlogs = await Blog.findAll({
      where: {
        author: decodeTokenData?.email,
      },
    });

    return res.send(allBlogs);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error,
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req?.params?.id;

    const decodeTokenData = await decodeToken(req);

    Blog.destroy({
      where: {
        id: id,
        author: decodeTokenData?.email,
      },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: "Blog was deleted successfully!",
        });
      } else {
        res.status(httpStatus.BAD_REQUEST).send({
          message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`,
        });
      }
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "Could not delete Blog with id=" + id,
    });
  }
};

export default {
  create,
  update,
  get,
  getAll,
  remove,
};
