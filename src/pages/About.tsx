export default function About() {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <div className="page-header">
            <h1>자기소개</h1>
          </div>
        </div>
      </div>

      <div className="container page-body">

        {/* 프로필 헤더 */}
        <div className="about-profile-card">
          <div className="about-avatar">👤</div>
          <div className="about-profile-info">
            <div className="about-name">조 영 빈</div>
            <div className="about-role">AI 활용 교육 담당자</div>
            <div className="about-org">한국전력기술(KDN) · AI 교육팀</div>
          </div>
        </div>

        <div className="about-grid">

          {/* 기본 정보 */}
          <section className="about-section">
            <div className="about-section-title">기본 정보</div>
            <div className="about-card">
              <div className="about-info-grid">
                <div className="about-info-item">
                  <span className="about-info-label">소속</span>
                  <span className="about-info-value">한국전력기술(KDN)</span>
                </div>
                <div className="about-info-item">
                  <span className="about-info-label">직책</span>
                  <span className="about-info-value">AI 교육 담당자</span>
                </div>
                <div className="about-info-item">
                  <span className="about-info-label">이메일</span>
                  <span className="about-info-value">youngbin@kdn.com</span>
                </div>
                <div className="about-info-item">
                  <span className="about-info-label">관심분야</span>
                  <span className="about-info-value">AI 활용, 데이터 분석, 업무 자동화</span>
                </div>
              </div>
            </div>
          </section>

          {/* 기술 스택 */}
          <section className="about-section">
            <div className="about-section-title">🛠 활용 도구 &amp; 기술</div>
            <div className="about-card">
              {[
                { category: 'AI 도구',    skills: ['Claude', 'ChatGPT', 'Copilot', 'Midjourney'] },
                { category: '개발',       skills: ['Python', 'Streamlit', 'React', 'SQL'] },
                { category: '업무 자동화', skills: ['Excel VBA', 'Power Automate', 'Notion API'] },
                { category: '데이터 분석', skills: ['Pandas', 'Matplotlib', 'Power BI'] },
              ].map(({ category, skills }) => (
                <div key={category} className="about-skill-group">
                  <div className="about-skill-category">{category}</div>
                  <div className="about-tags">
                    {skills.map(s => <span key={s} className="about-tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 경력 */}
          <section className="about-section">
            <div className="about-section-title">📋 주요 경력 &amp; 활동</div>
            <div className="about-card">
              <div className="about-timeline">
                {[
                  ['2024 – 현재', 'KDN AI 활용 교육 과정 기획 및 운영'],
                  ['2023',       '전사 ChatGPT 활용 워크숍 진행 (100명+)'],
                  ['2022',       '업무 자동화 파이썬 사내 교육 강의'],
                  ['2021',       '데이터 분석 기반 업무 보고서 시스템 구축'],
                ].map(([year, desc]) => (
                  <div key={year} className="about-timeline-item">
                    <span className="about-timeline-year">{year}</span>
                    <span className="about-timeline-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 자기소개 */}
          <section className="about-section">
            <div className="about-section-title">📝 자기소개</div>
            <div className="about-card">
              <p className="about-intro-text">
                안녕하세요. 한국전력기술(KDN)에서 AI 활용 교육을 담당하고 있는 조영빈입니다.<br /><br />
                저는 <strong>AI 도구를 실무에 접목</strong>하여 조직의 생산성을 높이는 일에 관심이 많습니다.
                ChatGPT, Claude 등 생성형 AI를 활용한 업무 자동화 사례를 발굴하고,
                이를 팀원들과 공유하며 함께 성장하는 문화를 만들어가고 있습니다.
              </p>
              <blockquote className="about-quote">
                "기술은 도구일 뿐, 중요한 것은 사람과 문제를 이해하는 것입니다."
              </blockquote>
            </div>
          </section>

        </div>

        {/* 연락처 */}
        <section className="about-section">
          <div className="about-section-title">📬 연락처</div>
          <div className="about-contact-grid">
            {[
              ['이메일', 'youngbin@kdn.com'],
              ['부서',   'AI 교육팀'],
              ['전화',   '031-8045-XXXX'],
            ].map(([label, value]) => (
              <div key={label} className="about-contact-item">
                <div className="about-contact-label">{label}</div>
                <div className="about-contact-value">{value}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
