import httpStatus from "http-status";
import db from "../models/index.js";
import { decodeToken } from "../middlewares/auth.js";

const getRandomImage = () => {
  const images = [
    "https://images.unsplash.com/photo-1484249170766-998fa6efe3c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MTc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1649605958244-73d7d5747bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1503707663-64584849606b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1503315883035-c3fb190b434e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1640098179176-659242894df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1506426305266-2b7e740fd828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MjY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1428953773181-b4cf23cd7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3Mjc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1542931287-023b922fa89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3Mjg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1512868567929-384904a22a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1699978055992-c2a704ba8d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1493515322954-4fa727e97985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE3MDY5MTI3MDg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  ];

  const randomIndex = Math.floor(Math.random() * images.length);

  return images[randomIndex];
};

const Blog = db.blog;

const create = async (req, res) => {
  const decodeTokenData = await decodeToken(req);

  const blog = {
    title: req?.body?.title || "",
    content: req?.body?.content,
    author: decodeTokenData?.email,
    published: req?.body?.published,
    background: req?.body?.background || getRandomImage(),
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
      const updatedBlog = await Blog.findByPk(id);
      return res.send(updatedBlog);
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
      order: [["updatedAt", "DESC"]],
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
