import React, { useState } from 'react';

const Post = ({ post, comments }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="comments">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.name}</strong> ({comment.email})</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
