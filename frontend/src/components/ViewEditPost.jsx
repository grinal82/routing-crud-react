// Компонент страницы просмотра/редактирования поста (ViewEditPost.js)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment'

const ViewEditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content || '');
  const navigate = useNavigate()

  useEffect(() => {
    // Запрос к бэкенду для получения информации о посте
    fetch(`http://localhost:7070/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        setEditedContent(data.post.content); // Обновляем editedContent
      });
  }, [id]);

  const handleDeletePost = () => {
    // Отправка DELETE-запроса для удаления поста
    fetch(`http://localhost:7070/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // После успешного удаления перенаправляем на главную страницу
        navigate('/');
      });
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleSavePost = () => {
    // Отправка POST-запроса для обновления поста
    console.log('Save button clicked')
    fetch(`http://localhost:7070/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editedContent }),
    })
      .then(() => {
        // После успешного обновления перенаправляем на предыдущую страницу
        navigate(-1);
      });
  };

  return (
    <div className='card-list'>
      <h1>{isEditing ? 'Редактировать пост' : 'Просмотр поста'}</h1>
      {isEditing ? (
        <>
          <div className='view-card'>
              <div className='card__item'>
                <div className="media-block">
                      <div className="media-left"><img className="img-circle img-sm" alt="Profile avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/></div>
                      <div className="media-body">
                        <div className="mar-btm">
                          <div className="btn-link text-semibold media-heading box-inline author-name">John Doe</div>
                          <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg"></i> {moment(post.created).fromNow()}</p>
                          <span className="delete-button" onClick={handleDeletePost}>&#10006;</span>
                        </div>
                        <textarea className='edit-textarea'
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          rows="4"
                          cols="50"
                        ></textarea>
                        <button className='save-btn' onClick={handleSavePost}>Сохранить</button>
                      </div>
                </div>
              </div>
          </div>
        </>
      ) : (
        <>
          <div className='view-card'>
            <div className='card__item'>
              <div className="media-block">
                    <div className="media-left"><img className="img-circle img-sm" alt="Profile avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/></div>
                    <div className="media-body">
                      <div className="mar-btm">
                        <div className="btn-link text-semibold media-heading box-inline author-name">John Doe</div>
                        <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg"></i> {moment(post.created).fromNow()}</p>
                      </div>
                      <div className='post-message'><p>{post.content}</p></div>
                    </div>
                    <button className='change-btn' onClick={handleEditPost}>Изменить</button>
                    <button className='delete-btn' onClick={handleDeletePost}>Удалить</button>
              </div>
            </div>
          </div>
          
        </>
      )}
      
      <div className='back-to-posts'><Link to="/">Назад к списку постов</Link></div>
    </div>
  );
};

export default ViewEditPost;
