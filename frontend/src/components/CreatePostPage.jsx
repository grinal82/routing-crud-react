// Компонент страницы создания поста 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreatePostPage = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = () => {
    // Отправка POST-запроса для создания нового поста
    fetch('http://localhost:7070/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then(() => {
        // После успешного создания поста перенаправляем на главную страницу
        navigate('/');
      });
  };

  return (
      <div className='card-list'>
        <h1>Создать пост</h1>
        <>
          <div className='view-card'>
              <div className='card__item'>
                <div className="media-block">
                  <div className="media-left"><img className="img-circle img-sm" alt="Profile avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/></div>
                    <div className="media-body">
                      <div className="mar-btm">
                        <div className="btn-link text-semibold media-heading box-inline author-name">John Doe</div>
                      <textarea className='create-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="4"
                        cols="50"
                      ></textarea>
                      <button className='save-btn' onClick={handleCreatePost}>Опубликовать</button>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </>
        <div className='back-to-posts'><Link to="/">Назад к списку постов</Link></div>
      </div>
  );
};

export default CreatePostPage;
