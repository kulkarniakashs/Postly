import zod, { string, z } from "zod"

export const signUPSchema = zod.object({
    fullname : string(),
    username : string().min(5),
    password : string().min(8)
})

export type singUPtype= z.infer<typeof signUPSchema>

export const signInSchema = zod.object({
    username : string().min(8),
    password : string().min(8)
})

export type SingIntype= z.infer<typeof signInSchema>

export const updateBlogSchema = zod.object({
    title : string(),
    content : string(),
    id : string()
})
export const createBlogSchema = zod.object({
    title : string(),
    content : string()
})
export type updateBlogtype = z.infer<typeof updateBlogSchema>
export type createBlogtype = z.infer<typeof createBlogSchema>
