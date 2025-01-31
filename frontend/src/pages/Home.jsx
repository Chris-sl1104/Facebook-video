import Layout from '../components/Layout';
import VideoPlayer from '../components/VideoPlayer';
import { Box } from '@mui/material';
import CommentList from "../components/CommentList.jsx";

const Home = () => {
    return (
        <Layout>
            <Box mt={4}>
                <VideoPlayer />
                <CommentList/>
            </Box>
        </Layout>
    );
};

export default Home;
