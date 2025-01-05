import { Hono } from "hono";
import { Router } from "hono/router";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema,updateBlogSchema } from "./types";
const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWTSEC : string
    }
}>() 

blogRouter.post('/',async (c) => {
    console.log(("in blogrouter"));
    const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  })
  let data = await c.req.json()
  const {success} = createBlogSchema.safeParse(data);
  if(!success){
    return c.json({
      msg : "Inputs are incorrect"
    })
  }
  let userid = c.get('jwtPayload')
  const newPost = await prisma.post.create({
    data : {
      title : data.title,
      content : data.content,
      authorid : userid
    }
  })
  return c.json({...newPost,
    msg : "post created successfully"
  })
})
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
try { 
  let data = await c.req.json()
  const {success} = updateBlogSchema.safeParse(data);
  if(!success){
    return c.json({
      msg : "Inputs are incorrect"
    })
  }
  const updated =await prisma.post.update({
    data : {
      title : data.title,
      content : data.content
    },
    where : {
      id : data.id
    }
  })
  return c.json({...updated})}
  catch(e){
    console.log(e);
    return c.text(JSON.stringify(e))
  }
})
blogRouter.get('/', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  //@ts-ignore
  let page :number= parseInt(c.req.query('page')) || 1;
  console.log(page);
  let pageSize = 10;
  let skip:number = (page-1)*pageSize;
  let allposts = await prisma.post.findMany({
    orderBy:{
      date : 'desc'
    },
    take : pageSize,
    skip  : skip,
    include : {
      author : {
        select : {
          username : true,
          fullname : true,
          id:true
        }
      }
    }
  });
  // console.log(allposts);
  let data = allposts.map(item=>{
    return {
      date : item.date,
      id : item.id,
      title : item.title,
      content : item.content,
      fullname : item.author.fullname,
      username : item.author.username,
      authorid : item.author.id
    }
  })
  return c.json(data) 
})

blogRouter.get('/followingposts',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  let followerid = c.get('jwtPayload')
  //@ts-ignore
  let page :number = parseInt(c.req.query('page')) || 1;
  let pagesize = 10;
  let skipsize = (page-1)* pagesize;
  let posts = await prisma.post.findMany({
    where : {
      author : {
        following: {
          some : {
            followerid : followerid
          }
        }
      }
    },
    include : {
      author : {
        select : {
          id : true,
          username : true,
          fullname : true
        }
      }
    },
    take:pagesize,
    skip: skipsize,
    orderBy : {
      date : "desc"
    }
  })
  if(posts.length === 0){
    return c.json({
      msg : "Blog not found"
    })
  }
  let arr = posts.map(item => item)
  return c.json(arr)
})

blogRouter.get('/:id',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl :c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    let blogid = c.req.param('id')
    let blog = await prisma.post.findFirst({
      where : {
        id : blogid
      },
      include: {
        author :{
          select :{
            username : true,
            fullname : true,
            id:true
          }
        }
      }
    })
    if(blog){
    let authordetail = blog.author;
    //@ts-ignore
    blog = {
      ...blog,
      username : authordetail.username,
      fullname : authordetail.fullname,
      authorid : authordetail.id
    }
    //@ts-ignore
    delete blog.author;
    return c.json(blog)
    }
    return c.json({
      msg : "blog not found!"
    })
  }
  catch(e){
    console.log(e);
    return c.text(JSON.stringify(e))
  }
})



export default blogRouter;