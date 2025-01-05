import { Hono } from "hono";
import { Router } from "hono/router";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWTSEC : string
    }
}>() 

userRouter.get('/follower',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    })
    let userId = c.get('jwtPayload') as string;
    let response = await prisma.follow.findMany({
      where : {
        followingid : userId
      },
      select : {
        follower : {
          select : {
            username : true,
            fullname : true,
            id : true
          }
        }
      }
    })
    if(response){
      let data = response.map(item => item.follower)
      if(data.length===0) return c.json({msg : "No follower"})
      return c.json(data)
    }
    return c.json({msg:"no follower"})
  })
  
  userRouter.post('/follow',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    })
    let data = await c.req.json()
    let followingid = data.followingid;
    let followerid = c.get('jwtPayload')
    let response = await prisma.follow.create({
      data : {
        followerid : followerid,
        followingid : followingid
      }
    })
    return c.json(response)
  })
  userRouter.post('/unfollow',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    })
    let data = await c.req.json()
    let followingid = data.followingid;
    let followerid = c.get('jwtPayload')
    let response = await prisma.follow.deleteMany({
      where : {
        followerid : followerid,
        followingid : followingid
      }
    })
    return c.json(response)
  })

  userRouter.post('/allposts',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    let data = await c.req.json();
    let queryUser = data.queryUser;
    console.log("queryUser",queryUser);
    
    let forPosts = await prisma.user.findFirst({
      where : {
        id : queryUser
      },
      include : {
        posts : {
          select : {
            title : true,
            content : true,
            id : true
          },
          orderBy:{
            date: "desc"
          }
        }
      }
    })
    let forFollowing = await prisma.follow.findMany({
      where : {
        followerid : queryUser
      },
      include : {
        following : {
          select : {
                    username : true,
                    fullname : true,
                    id : true
          }
        }
      }
    })
    let forFollower = await prisma.follow.findMany({
      where : {
        followingid : queryUser
      },
      include : {
        follower : {
          select : {
            username : true,
            fullname : true,
            id : true
          }
        }
      }
    })
    if(forPosts){
      let following = forFollowing.map(item => item.following)
      let allposts = forPosts.posts.map(item=>item)
      let followers = forFollower.map(item => item.follower)
      return c.json({
        following,
        allposts,
        followers
      })
    }
    return c.json({msg:"some errors"})
  })

  userRouter.get('/following',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    let userid = c.get('jwtPayload') as string;
    let response = await prisma.follow.findMany({
        where:{
            followerid : userid
        },
        include: {
            following : {
                select : {
                    username : true,
                    fullname : true,
                    id : true
                }
            }
        }
    })
    if(response){
        let data = response.map(item => item.following)
        if(data.length===0) return c.json({msg : "follow someone"})
        return c.json(data)
    }
    return c.json({msg : "could not found"})
  })

  userRouter.post('/checkrelation',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  let data =await c.req.json()
  let queryUser = data.queryUser;
  let userid = c.get('jwtPayload')
  let relate = await prisma.follow.findFirst({
    where: {
      followerid : userid,
      followingid : queryUser
    }
  })
  if (relate){
    console.log(relate);
    
    return c.json({
      isFollowed : true
    })
  }
  return c.json({
    isFollowed : false
  })
  })

  
  userRouter.post('/detail',async(c)=>{
  const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  let data =await c.req.json()
  let queryUser = data.queryUser;
  let res =await prisma.user.findFirst({
    where: {
      id : queryUser
    },
    select : {
      username : true,
      fullname : true
    }
  })
  if(res){
    console.log(res);
    
   return c.json(res)
  }
  return c.json({msg:"sosfs"})
  })
  userRouter.get('/detail',async(c)=>{
  const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  let queryUser = c.get('jwtPayload')
  let res =await prisma.user.findFirst({
    where: {
      id : queryUser
    },
    select : {
      username : true,
      fullname : true,
      id : true
    }
  })
  if(res){
    console.log(res);
    
   return c.json(res)
  }
  return c.json({msg:"sosfs"})
  })

export default  userRouter