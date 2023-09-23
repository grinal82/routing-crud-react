// Импорты из библиотеки
import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';

// Импоты из директорий приложения
import PostsPage from './components/PostsPage';
import CreatePostPage from './components/CreatePostPage';
import ViewEditPost from './components/ViewEditPost';
import './App.css';

// Приложение/точка входа
function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" exact element={<PostsPage />} />
          <Route path="/posts/new" element={<CreatePostPage />} />
          <Route path="/posts/:id" element={<ViewEditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
