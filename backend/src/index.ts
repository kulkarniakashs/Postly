import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import {PrismaClient} from "@prisma/client/edge"
import {decode,sign,verify} from "hono/jwt"
import blogRouter from './blogRouting'
import { cors } from 'hono/cors'
import userRouter from './userRouter'
import { signUPSchema ,signInSchema} from './types'
const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
    JWTSEC : string
  }
}>()
app.use('/*',cors())

app.get('/', (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate())
  return c.text('Hello Hono!')
})

app.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  let data =await  c.req.json();
  const {success} = signUPSchema.safeParse(data);
  if(!success){
    return c.json({
      msg : "Inputs are incorrect"
    })
  }
  try{
  let response = await prisma.user.create({
    data:{
      fullname : data.fullname,
      username : data.username,
      password : data.password
    }
  })
  if(response){
    let token =await sign({id:response.id},c.env.JWTSEC)
    return c.json({token:token})
}
}
catch(e){
  console.log("THERE IS ERROR");
  console.log(e);
  return c.text(JSON.stringify(e))
}
})
app.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  })
  const data =await  c.req.json()
  const {success} = signInSchema.safeParse(data);
  const response = await prisma.user.findFirst({
    where:{
      username: data.username,
      password: data.password
    },
    select : {
      id: true
    }
  })
   if(response){
  let token =await sign({id:response.id},c.env.JWTSEC)
   return c.json({token:token})
    }
 return c.json({
  msg : "user not available"
 })
})




app.use('/user/*',async (c,next)=>{
  let string =  c.req.header("authorization");
  if(string === undefined){
    return c.json({msg:"user does not exits"})
  }
  let token = string?.split(" ");
  if(token){
    //@ts-ignore
    const verified =await verify(token[1],c.env.JWTSEC)
    if(verified){
      
      const decoded = decode(token[1])
      console.log(decoded.payload);
      
      c.set('jwtPayload',decoded.payload.id)
      await next()
    }
    c.json({
      msg : "user does not exits"
    })
  }
  return c.json({msg : "user does not exits"})
})

app.route('/user',userRouter);


app.use('/blog/*',async (c,next)=>{
  let string = c.req.header("authorization");
  if(string === undefined){
    console.log("should be redirected");
    
    return c.redirect('/signin')
  }
  let token = string?.split(" ");
  if(token){
    //@ts-ignore
    const verified =await verify(token[1],c.env.JWTSEC)
    if(verified){
      console.log("verified");
      
      const decoded = decode(token[1])
      console.log(decoded.payload);
      
      c.set('jwtPayload',decoded.payload.id)
      await next()
    }
    c.json({
      msg : "User does not exitst"
    })
  }
  c.redirect('/signin')
})
app.route('/blog',blogRouter)
// app.post('/blog',async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   })
//   let data = await c.req.json()
//  let userid = c.get('jwtPayload')
//   const newPost = await prisma.post.create({
//     data : {
//       title : data.title,
//       content : data.content,
//       authorid : userid
//     }
//   })
//   return c.json({newPost})
// })
// app.put('/blog', async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate());
// try { let data = await c.req.json()
//   const updated =await prisma.post.update({
//     data : {
//       title : data.title,
//       content : data.content
//     },
//     where : {
//       id : data.id
//     }
//   })
//   return c.json({...updated})}
//   catch(e){
//     console.log(e);
//     return c.text(JSON.stringify(e))
//   }
// })
// app.get('/blog', async(c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate())
//   let allposts = await prisma.post.findMany();
//   return c.json({...allposts}) 
// })
// app.get('/blog/:id',async (c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl :c.env.DATABASE_URL
//   }).$extends(withAccelerate());
//   try {
//     let blogid = c.req.param('id')
//     let blog = await prisma.post.findFirst({
//       where : {
//         id : blogid
//       }
//     })
//     if(blog){
//     return c.json({...blog})
//     }
//     return c.json({
//       msg : "blog not found!"
//     })
//   }
//   catch(e){
//     console.log(e);
//     return c.text(JSON.stringify(e))
//   }
// })
export default app
