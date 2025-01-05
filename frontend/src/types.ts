export type SignUpType = {
    fullname: string;
    username: string;
    password: string;
};

export type SignInType = {
    username: string;
    password: string;
};

export type UpdateBlogType = {
    title: string;
    content: string;
    id: string;
};

export type CreateBlogType = {
    title: string;
    content: string;
};