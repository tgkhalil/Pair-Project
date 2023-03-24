const express = require("express");
const app = express();
const port = 8000;
const jwt = require('jsonwebtoken');
// const passport =require(' passport-http-bearer');
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  UpdateBlog,
  deleteBlog,
  createUser,
  getuser,
  addComment,
  findUser,
} = require("../mongoDB/index.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all blogs
app.get("/blogs", (req, res) => {
  getAllBlogs()
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET a blog by ID
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  getBlogById(id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send();
      }
      res.json(blog);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST a new blog
app.post("/blogs", (req, res) => {
  const { title, content, author, Like, comment } = req.body;
  createBlog(title, content, author, Like, comment)
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// PUT an updated blog
app.put("/blogs/:id", (req, res) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  UpdateBlog(id, updatedBlog)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send();
      }
      res.json(blog);
    })
    .catch((err) => {
      console.log(err);
    });
});

// DELETE a blog by ID
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  deleteBlog(id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send();
      }
      res.json(blog);
    })
    .catch((err) => {
      console.log(err);
    });
});
//getUser
app.get("/users", (req, res) => {
  getuser()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add a new user
app.post("/users", (req, res) => {
  const { userName, password } = req.body;
  createUser(userName, password)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
//add comment
app.put("/comments/:id", (req, res) => {
  const comment = req.body.comment;
  const id = req.params.id;
  addComment(id, comment)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
//find the user
const SECRET_KEY = 'mysecretkey';
app.post('/connection', async (req, res) => {
  
  const { userName, password } = req.body;

  try {
    // Find the user in the database
    const user = await findUser({ userName });

    // If the user doesn't exist or the password is incorrect, send an error response
    if (!user || !await user.checkPassword(password)) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT to send back to the client
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

    

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
