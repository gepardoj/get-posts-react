import { useState, useEffect } from 'react';
import { Card, Flex, Skeleton, Spin, Typography } from 'antd';
import { useFetchPosts } from '@/entities/post/api/post.api';

const LOAD_MORE_THRESHOLD = 25;
const POSTS_LIMIT = 10;
const SKELETON_POSTS_NUMBER = 4;

const PostsList = () => {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useFetchPosts(offset, POSTS_LIMIT);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isNearBottom = (clientHeight + scrollTop + LOAD_MORE_THRESHOLD) > scrollHeight;
      if (isNearBottom && !isLoading) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  if (isLoading) return <Spin />;

  if (error !== null) return <Typography.Paragraph type="danger">{error.message}</Typography.Paragraph>;

  if (data?.posts?.length === 0) {
    return <Typography.Paragraph type="warning">No posts found</Typography.Paragraph>;
  }

  return (
    <Flex gap="middle" wrap justify='center' style={{ marginBottom: 250 }}>
      {data?.posts?.map((post) => (
        <Card key={post.id} title={post.title} style={{ width: '30%', minWidth: 300 }}>
          <Typography.Paragraph>{post.body}</Typography.Paragraph>
        </Card>
      ))}
      <div style={{ width: "100%" }}></div>

      {data?.limit === POSTS_LIMIT && Array(SKELETON_POSTS_NUMBER).fill(0).map((_, i) =>
        <Card key={i} style={{ width: '30%', minWidth: 300 }}>
          <Skeleton active />
        </Card>
      )}
    </Flex>
  );
};

export default PostsList;