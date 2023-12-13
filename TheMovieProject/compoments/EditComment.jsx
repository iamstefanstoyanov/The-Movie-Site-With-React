import { useEffect, useState } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';

import { editComment, getCurrentComment } from '../services/commentsService';

import Spinner from './Spinner';
import useForm from '../hooks/useForm';

const formKeys = {
  text: 'comment',
};

export default function EditComment() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [comment, setComment] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getCurrentComment(id)
      .then(setComment)
      .finally(() => setIsLoading(false));
  }, [id]);

  const editCommentHandler = async (newComment) => {
    await editComment(newComment);
    navigate('/profile');
  };
  
  const { inputs, onChangeInput, submitForm } = useForm(
    editCommentHandler,
    comment
  );

  return (
    <>
      <h1>Edit Comment</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className='edit-comment-container movie-comments-container'>
          <form className='edit-form' onSubmit={submitForm}>
            <textarea
              className='textarea'
              type='text'
              name={formKeys.text}
              value={inputs[formKeys.text]}
              onChange={onChangeInput}
            />
            <div className='edit-del-btns'>
              <input
                className='edit-btn-submit'
                type='submit'
                value='Edit Comment'
              />
              <Link to='/profile'>
                <button type='button' className='close-btn'>
                  Close
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
