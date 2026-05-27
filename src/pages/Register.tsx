import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirm, setNeedsConfirm] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error, needsConfirm } = await signUp(email, password)
    if (error) {
      if (error.message.includes('rate limit') || error.message.includes('429'))
        setError('잠시 후 다시 시도해 주세요. (이메일 발송 한도 초과)')
      else if (error.message.includes('already registered'))
        setError('이미 가입된 이메일입니다.')
      else
        setError(error.message)
      setLoading(false)
    } else if (needsConfirm) {
      setNeedsConfirm(true)
    } else {
      navigate('/')
    }
  }

  if (needsConfirm) {
    return (
      <div className="auth-wrap">
        <div className="auth-card">
          <h1 className="auth-title">이메일 확인</h1>
          <div className="alert alert-info">
            <strong>{email}</strong> 로 인증 메일을 보냈습니다.<br />
            받은 편지함을 확인하고 링크를 클릭해 주세요.
          </div>
          <p className="auth-footer"><Link to="/login">로그인 페이지로</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">회원가입</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="이메일을 입력하세요" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="6자 이상 입력하세요" minLength={6} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-full">
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
        <p className="auth-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  )
}
