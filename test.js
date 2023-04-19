//게시글 작성 /posts POST
const Posts = require("../schemas/posts.js");
router.post("/posts/", async (req, res) => {
  const { user, password, title, content } = req.body;

  const posts = await Posts.find({ user });
  if (posts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 User입니다.",
    });
  }

  const createdPosts = await Posts.create({
    user,
    password,
    title,
    content,
  });
  res.json({ posts: createdPosts });
});
