import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">게시판</Link>
        <div className="navbar-menu">
          <Link to="/about" className="navbar-menu-item">자기소개</Link>
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user">{user.email?.split('@')[0]}</span>
              <Link to="/posts/create" className="btn btn-primary btn-sm">글 작성</Link>
              <button onClick={handleSignOut} className="btn btn-outline btn-sm">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">로그인</Link>
              <Link to="/register" className="btn btn-primary btn-sm">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
