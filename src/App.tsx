import { useState, useEffect, useTransition } from 'react';
import { Card, Flex, Spin, Typography } from 'antd';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts?limit=10&skip=0');
        if (!response.ok) {
          setError("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);

      } catch (err) {
        setError(String(err));
      }

    });
  }, []);

  if (isPending) return <Spin />;

  if (error !== null) return <Typography.Paragraph type="danger">{error}</Typography.Paragraph>;

  return (
    <Flex gap="middle" wrap justify='center'>
      {posts?.map((post) => (
        <Card key={post.id} title={post.title} style={{ width: '30%', minWidth: 300, padding: '10px', margin: '5px' }}>
          <Typography.Paragraph>{post.body}</Typography.Paragraph>
        </Card>
      ))}
    </Flex>
  );
};

export default App;