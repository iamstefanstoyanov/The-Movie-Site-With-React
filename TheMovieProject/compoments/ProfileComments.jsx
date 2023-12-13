import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  deleteComment,
  getCurrentUserComments,
} from '../services/commentsService';
import { formatDate } from '../utils/dataUtils';
import AuthContext from '../context/authContext';

export default function ProfileComments() {
  
  const [userComments, setUserComments] = useState({});
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    getCurrentUserComments(userId)
      .then(setUserComments)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = (e, id) => {
    deleteComment(id);
    setUserComments(userComments.filter((c) => c._id !== id));
  };

  return (
    <>
      {!userComments.length == 0 ? (
        <>
          {userComments?.map((c) => (
            <li key={c._id} id={c._id}>
              <p className='comment-p'>
                <span>Movie title:</span> {c.title}
              </p>
              <p className='comment-p'>
                <span>Created on:</span> {formatDate(c._createdOn)}
              </p>
              <hr />
              <p className='comment'>
                <span>Comment:</span> {c.comment}
              </p>
              <div className='edit-delete-comments-btns'>
                <Link to={`/editcomment/${c._id}`}>
                  <button className='edit-comment-btn' type='button'>
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  className='delete-comment-btn'
                  onClick={(e) => deleteHandler(e, c._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </>
      ) : (
        <div className='no-comments'>
          <p>You do not have any comments yet.</p>
        </div>
      )}
    </>
  );
}
