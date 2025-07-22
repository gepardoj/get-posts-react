import { useState, useEffect } from 'react';
import { Badge, Card, Flex, Skeleton, Tag, Typography } from 'antd';
import { useFetchPosts } from '@/entities/post/api/post.api';
import type { PostTag } from '@/entities/post/model/post.model';
import HeartIcon from '@/shared/ui/icons/HeartIcon';
import DislikeIcon from '@/shared/ui/icons/DislikeIcon';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { addPosts } from '@/entities/post/model/post.slice';

const LOAD_MORE_THRESHOLD = 25;
const POSTS_LIMIT = 10;
const SKELETON_POSTS_NUMBER = 10;

const TAGS_COLORS: Record<PostTag, string> = {
  american: "blue",
  french: "volcano",
  english: "orange",
  fiction: "gold",
  history: "red",
  love: "magenta",
  magical: "green",
  mystery: "cyan",
  classic: "gray",
  crime: "purple",
};

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const [offset, setOffset] = useState(0);
  const [lastPostsNumber, setLastPostsNumber] = useState(POSTS_LIMIT);
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

  useEffect(() => {
    if (data) {
      dispatch(addPosts(data.posts));
    }
    if (data !== undefined) {
      setLastPostsNumber(data.limit);
    }
  }, [data]);

  if (error !== null) return <Typography.Paragraph type="danger">{error.message}</Typography.Paragraph>;

  if (!isLoading && posts?.length === 0) {
    return <Typography.Paragraph type="warning">No posts found</Typography.Paragraph>;
  }

  return (
    <Flex gap="middle" wrap justify='center' style={{ marginBottom: 250 }}>
      {posts?.map((post) => (
        <Card key={post.id} title={post.title} style={{ width: '30%', minWidth: 300 }}>
          <Typography.Paragraph className='truncate-3-lines'>{post.body}</Typography.Paragraph>
          {post.tags?.map(tag => <Tag key={tag} color={TAGS_COLORS[tag]}>{tag}</Tag>)}
          <Flex style={{ marginTop: 24 }} gap={24}>
            <Badge count={post.reactions.likes} size='small' color="red" overflowCount={999}>
              <HeartIcon />
            </Badge>
            <Badge count={post.reactions.dislikes} size="small" color="gold" overflowCount={999}>
              <DislikeIcon />
            </Badge>
          </Flex>
        </Card>
      ))}
      {lastPostsNumber === POSTS_LIMIT && isLoading && Array(SKELETON_POSTS_NUMBER).fill(0).map((_, i) =>
        <Card key={i} style={{ width: '30%', minWidth: 300 }}>
          <Skeleton active />
        </Card>
      )}
    </Flex>
  );
};

export default PostsList;