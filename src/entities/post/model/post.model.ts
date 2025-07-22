export interface PostsResponse {
  posts: Post[];
  limit: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}