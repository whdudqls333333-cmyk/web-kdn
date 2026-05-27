import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/web-kdn">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/create" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
            <Route path="/posts/:id/edit" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
