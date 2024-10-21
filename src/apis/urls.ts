export const urls = {
  users: {
    list: "/users",
    byId: (id: number) => `/users/${id}`,
    post: (id: number) => `/users/${id}/posts`,
  },
  comments: {
    byPostId: (pid: number) => `/comments/post/${pid}`,
  },
  posts: {
    list: "/posts",
    byTag: (tag: string) => `/posts/tag/${tag}`,
    byId: (id: number) => `/posts/${id}`,
    search: (q: string) => `/posts/search/${q}`,
  },
};
