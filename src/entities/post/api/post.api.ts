import type { PostsResponse } from "@/entities/post/model/post.model";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (offset: number, limit: number) => {
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${offset}`);
  return response.json();
};

export const useFetchPosts = (offset: number, limit: number) => useQuery<PostsResponse>({
  queryKey: ['posts', offset],
  queryFn: () => fetchPosts(offset, limit),
});