import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
  { id: 1, title: 'Bhupander', excerpt: 'I am Bhupander, and i am 23 as of 2024, this is my first website, and i woudld always want to imporve this website as much as i learn in the futre and would no matter what try new things throughout my web journey. This is fascinating' },
  { id: 2, title: 'Sunlight', excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maiores amet sint. Id, et dolores perferendis sed officiis magnam mollitia velit omnis vero, at modi sapiente maxime soluta ipsa perspiciatis. Aliquam, minus? Aliquam modi soluta aut quam quia quas? Maxime eligendi, cum officiis quasi doloribus impedit obcaecati, quibusdam accusamus dolor, iste molestias. Quas laudantium in doloribus hic dicta, fugit fugiat odio harum. Perspiciatis, ullam. Sequi non eaque harum facere illum, quam, quidem reprehenderit esse, laboriosam vitae minima maiores assumenda. Cum rerum, obcaecati fugiat deserunt sunt eos rem quidem, suscipit voluptatem, repellat debitis quos consequuntur illum facilis iusto distinctio deleniti dicta!' },
  { id: 3, title: 'Moonlight', excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ad sequi nobis voluptatum ex fugit labore facere ipsam error adipisci necessitatibus velit quibusdam, ullam assumenda, unde eligendi facilis? Nobis temporibus labore optio provident? Voluptas mollitia qui quis quasi laborum repellendus id ullam commodi eum veniam, tempora tempore dolor nesciunt dolorum magni, impedit cumque. Beatae aliquam ut autem, amet praesentium suscipit molestiae repellat aspernatur ad unde, veniam sequi culpa dignissimos id quibusdam odio? At pariatur ut dolorem eum earum, rem omnis reiciendis veniam ad numquam, exercitationem provident nam ipsum nostrum mollitia tempore quis nemo quos dolor non repudiandae ducimus temporibus. Nostrum officiis est sed et voluptatum optio pariatur beatae libero voluptas dolore. Illum expedita quam enim.' },
];


app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
  res.render("index.ejs", {blogs: blogs});
});

app.get("/create", (req, res)=>{
  res.render("create.ejs")
});


app.post("/create", (req, res)=>{
  const {title, content} = req.body;

  const newBlog = {
    id: blogs.length +1,
    title: title,
    excerpt: content.substring(0, 500) + '...',
  };
  
  blogs.push(newBlog);

  res.redirect("/");
});

app.get("/about", (req,res)=>{

  res.render('about.ejs');
});
app.get("/contact", (req, res)=>{
  res.render("contact");
});

// the main logic part, where dynamic routing is applied

app.get('/blogs/:id', (req, res) => {
  // Extract the blog ID from the request params
  const blogId = parseInt(req.params.id);
  
  // Find the blog with the matching ID
  const blog = blogs.find(b => b.id === blogId);
  
  // If the blog is found, render the 'blog.ejs' view to show the full blog
  if (blog) {
    res.render('blog.ejs', { blog: blog });
  } else {
    // If the blog is not found, send a 404 error
    res.status(404).send('Blog post not found');
  }
});

app.listen(port, ()=>{
  console.log("The app is running on port: ", port); 
});