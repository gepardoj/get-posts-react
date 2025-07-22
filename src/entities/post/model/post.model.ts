export interface PostsResponse {
  posts: Post[];
  limit: number;
}

export type PostTag = "history" | "french" | "american" | "fiction" | "english" | "magical" | "mystery" | "crime" | "love" | "classic";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: PostTag[];
  reactions: { likes: number, dislikes: number; };
}