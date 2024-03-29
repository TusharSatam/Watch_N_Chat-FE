// CommentForm.js

import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-2 md:gap-4'>
      <textarea
        value={commentText}
        onChange={handleChange}
        placeholder="Write your comment..."
        rows={3}
        className='border-2 rounded-lg resize-none w-[60vw] md:w-[300px] p-1 h-[60px] md:h-[80px]'
      />
      <button type="submit" className='bg-black text-white p-2 md:px-4 rounded-lg'>Submit</button>
    </form>
  );
};

export default CommentForm;
