import React, { useState } from 'react';
import Post from './Post';

const PostList = ({ posts, comments }) => {
  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} comments={comments.filter(comment => comment.postId === post.id)} />
      ))}
    </div>
  );
};

export default PostList;
