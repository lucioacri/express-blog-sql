const { posts } = require("../data.js");

const index = (req, res) => {
  let filteredPosts = [...posts];
  if (req.query.tags) {
    filteredPosts = posts.filter((post) => post.tags.includes(req.query.tags));
    return res.json({
      description: "Post filtrati",
      object: filteredPosts,
    });
  }
  if (req.query.title) {
    filteredPosts = posts.filter((post) =>
      post.title.includes(req.query.title)
    );
    return res.json({
      description: "Post filtrati",
      object: filteredPosts,
    });
  }
  res.json({
    Description: "Lista dei post",
    Object: posts,
  });
};

const show = (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({
    Description: "Visualizzaziuone del post " + id,
    Object: post,
  });
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body;

  let lastId = 0;

  for (const post of posts) {
    if (post.id > lastId) lastId = post.id;
  }
  const postId = lastId + 1;
  const newPost = { id: postId, title, content, image, tags };

  let hasErrors = false;
  const errorsArray = [];

  if (!title || typeof title !== "string" || title.length < 1) {
    errorsArray.push("title");
    hasErrors = true;
  }
  if (!content || typeof content !== "string" || content.length < 1) {
    errorsArray.push("content");
    hasErrors = true;
  }
  if (!image || typeof image !== "string" || image.length < 1) {
    errorsArray.push("image");
    hasErrors = true;
  }
  if (!Array.isArray(tags)) {
    errorsArray.push("tags");
    hasErrors = true;
  }
  if (hasErrors) {
    const error = new Error("Request has errors");
    error.statusCode = 400;
    error.data = errorsArray;
    throw error;
  }

  posts.push(newPost);
  res.status(201).json(newPost);
};

const update = (req, res) => {
  // ID Control
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
  const { title, content, image, tags } = req.body;
  // Post control

  let hasErrors = false;
  const errorsArray = [];

  if (!title || typeof title !== "string" || title.length < 1) {
    errorsArray.push("title");
    hasErrors = true;
  }
  if (!content || typeof content !== "string" || content.length < 1) {
    errorsArray.push("content");
    hasErrors = true;
  }
  if (!image || typeof image !== "string" || image.length < 1) {
    errorsArray.push("image");
    hasErrors = true;
  }
  if (!Array.isArray(tags)) {
    errorsArray.push("tags");
    hasErrors = true;
  }
  if (hasErrors) {
    const error = new Error("Request has errors");
    error.statusCode = 400;
    error.data = errorsArray;
    throw error;
  }
  //
  const updatedPost = { id: postId, title, content, image, tags };
  const originalPostId = posts.indexOf(post);
  posts.splice(originalPostId, 1, updatedPost);
  res.json(updatedPost);
};

const destroy = (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }
  posts.splice(posts.indexOf(post), 1);
  res.sendStatus(204);
  console.log(posts);
};

module.exports = { index, show, store, update, destroy };
