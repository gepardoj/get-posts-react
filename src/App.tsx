import { Flex, Typography } from 'antd';
import PostsList from '@/entities/post/ui/PostsList';


const App = () => {
  return (
    <Flex vertical align='center'>
      <Typography.Title style={{ marginBottom: 40 }}>News</Typography.Title>
      <PostsList />
    </Flex>
  );
};

export default App;