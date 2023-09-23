// Компонент списка постов (PostsPage.js)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Запрос к бэкенду для получения списка постов
    fetch('http://localhost:7070/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <div className='card-list'>
        <h1>Список постов</h1>
        <Link to="/posts/new">Создать пост</Link>
        <div className='card'>
          {posts.map((post) => (
            <div className='card__item' key={post.id}>
              <Link to={`/posts/${post.id}`}>
              <div className="media-block">
                <div className="media-left"><img className="img-circle img-sm" alt="Profile avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/></div>
                <div className="media-body">
                  <div className="mar-btm">
                    <div className="btn-link text-semibold media-heading box-inline author-name">John Doe</div>
                    <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg"></i> {moment(post.created).fromNow()}</p>
                  </div>
                  <div className='post-message'><p>{post.content}</p></div>
                  <div className="pad-ver">
                      <div className="btn btn-sm btn-default btn-hover-success"><i class="fa fa-thumbs-up"></i></div>
                      <div className="btn btn-sm btn-default btn-hover-danger"><i className="fa fa-thumbs-down"></i></div>
                    <div className="btn btn-sm btn-default btn-hover-primary comment-btn">Comment</div>
                  </div>
                </div>
              </div> 
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostsPage;
