import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(postsResponse.data);
    };

    const fetchComments = async () => {
      const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
      setComments(commentsResponse.data);
    };

    fetchPosts();
    fetchComments();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.includes(filter) || post.body.includes(filter)
  );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by title or body"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="title">Title</option>
      </select>
      <PostList posts={currentPosts} comments={comments} />
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
