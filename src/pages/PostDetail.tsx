import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Post, Comment } from '../types'

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('posts')
      .select('*, profiles(id, email)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { navigate('/'); return }
        setPost(data as Post)
        setLoading(false)
      })

    supabase
      .from('comments')
      .select('*, profiles(id, email)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setComments((data as Comment[]) ?? []))
  }, [id, navigate])

  const handleDelete = async () => {
    if (!confirm('게시글을 삭제할까요?')) return
    await supabase.from('posts').delete().eq('id', id)
    navigate('/')
  }

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !commentText.trim()) return
    setSubmitting(true)
    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: id, content: commentText.trim(), author_id: user.id })
      .select('*, profiles(id, email)')
      .single()
    if (!error && data) {
      setComments(prev => [...prev, data as Comment])
      setCommentText('')
    }
    setSubmitting(false)
  }

  const handleCommentDelete = async (commentId: string) => {
    await supabase.from('comments').delete().eq('id', commentId)
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  if (loading) return <div className="loading">불러오는 중...</div>
  if (!post) return null

  return (
    <div className="container page">
      <div className="post-detail">
        <div className="post-detail-header">
          <Link to="/" className="back-link">← 목록으로</Link>
          {user?.id === post.author_id && (
            <div className="post-actions">
              <Link to={`/posts/${id}/edit`} className="btn btn-outline btn-sm">수정</Link>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">삭제</button>
            </div>
          )}
        </div>

        <h1 className="post-title">{post.is_notice && '📢 '}{post.title}</h1>
        <div className="post-meta">
          <span>{post.profiles?.email?.split('@')[0] ?? '익명'}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
        <div className="post-content">{post.content}</div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="comment-section">
          <h2 className="comment-title">댓글 {comments.length}</h2>

          {comments.map(c => (
            <div key={c.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{c.profiles?.email?.split('@')[0] ?? '익명'}</span>
                <span className="comment-date">{formatDate(c.created_at)}</span>
                {user?.id === c.author_id && (
                  <button onClick={() => handleCommentDelete(c.id)} className="btn-text-danger">삭제</button>
                )}
              </div>
              <p className="comment-content">{c.content}</p>
            </div>
          ))}

          {user ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                className="form-textarea"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="댓글을 입력하세요"
                rows={3}
                required
              />
              <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                {submitting ? '등록 중...' : '댓글 등록'}
              </button>
            </form>
          ) : (
            <p className="comment-login-msg">
              <Link to="/login">로그인</Link> 후 댓글을 작성할 수 있습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
