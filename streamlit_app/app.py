import streamlit as st

st.set_page_config(
    page_title="자기소개 | KDN",
    page_icon="👤",
    layout="wide",
)

# ── 스타일 ──────────────────────────────────────────────────
st.markdown("""
<style>
  .main { background-color: #f8fafc; }
  .profile-card {
    background: #1E3A8A;
    border-radius: 16px;
    padding: 2rem;
    color: white;
    text-align: center;
  }
  .profile-name { font-size: 2rem; font-weight: 800; margin-bottom: .25rem; }
  .profile-role { font-size: 1.1rem; opacity: .85; }
  .section-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1E3A8A;
    border-left: 4px solid #1E3A8A;
    padding-left: .75rem;
    margin-bottom: 1rem;
  }
  .skill-tag {
    display: inline-block;
    background: #EFF6FF;
    color: #1E40AF;
    border: 1px solid #BFDBFE;
    border-radius: 999px;
    padding: .25rem .75rem;
    font-size: .875rem;
    margin: .2rem;
    font-weight: 500;
  }
  .info-row { display: flex; gap: .5rem; align-items: center; margin-bottom: .5rem; font-size: .95rem; }
  .info-label { color: #64748B; min-width: 70px; font-weight: 500; }
</style>
""", unsafe_allow_html=True)

# ── 프로필 헤더 ─────────────────────────────────────────────
col_left, col_right = st.columns([1, 2], gap="large")

with col_left:
    st.markdown("""
    <div class="profile-card">
      <div style="font-size:5rem; margin-bottom:.5rem;">👤</div>
      <div class="profile-name">홍 길 동</div>
      <div class="profile-role">AI 활용 교육 담당자</div>
      <br>
      <div style="opacity:.75; font-size:.85rem;">KDN · 한국전력기술</div>
    </div>
    """, unsafe_allow_html=True)

with col_right:
    st.markdown('<div class="section-title">기본 정보</div>', unsafe_allow_html=True)
    st.markdown("""
    <div class="info-row"><span class="info-label">소속</span> 한국전력기술(KDN) AI 교육팀</div>
    <div class="info-row"><span class="info-label">직책</span> 교육 담당자</div>
    <div class="info-row"><span class="info-label">이메일</span> hongildong@kdn.com</div>
    <div class="info-row"><span class="info-label">관심분야</span> AI 활용, 데이터 분석, 업무 자동화</div>
    """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown('<div class="section-title">한 줄 소개</div>', unsafe_allow_html=True)
    st.info("💡 AI 도구를 활용해 실무 효율을 높이고, 팀원들과 함께 성장하는 것을 목표로 합니다.")

st.divider()

# ── 기술 스택 ───────────────────────────────────────────────
col1, col2 = st.columns(2, gap="large")

with col1:
    st.markdown('<div class="section-title">🛠 활용 도구 & 기술</div>', unsafe_allow_html=True)

    categories = {
        "AI 도구": ["Claude", "ChatGPT", "Copilot", "Midjourney"],
        "개발": ["Python", "Streamlit", "React", "SQL"],
        "업무 자동화": ["Excel VBA", "Power Automate", "Notion API"],
        "데이터 분석": ["Pandas", "Matplotlib", "Power BI"],
    }
    for category, skills in categories.items():
        st.markdown(f"**{category}**")
        tags_html = " ".join(f'<span class="skill-tag">{s}</span>' for s in skills)
        st.markdown(tags_html, unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)

with col2:
    st.markdown('<div class="section-title">📋 주요 경력 & 활동</div>', unsafe_allow_html=True)

    experiences = [
        ("2024 – 현재", "KDN AI 활용 교육 과정 기획 및 운영"),
        ("2023", "전사 ChatGPT 활용 워크숍 진행 (100명+)"),
        ("2022", "업무 자동화 파이썬 사내 교육 강의"),
        ("2021", "데이터 분석 기반 업무 보고서 시스템 구축"),
    ]
    for year, desc in experiences:
        with st.container():
            col_y, col_d = st.columns([1, 3])
            col_y.markdown(f"**{year}**")
            col_d.markdown(desc)
        st.markdown("---")

st.divider()

# ── 자기소개 ────────────────────────────────────────────────
st.markdown('<div class="section-title">📝 자기소개</div>', unsafe_allow_html=True)
st.markdown("""
안녕하세요. 한국전력기술(KDN)에서 AI 활용 교육을 담당하고 있는 홍길동입니다.

저는 **AI 도구를 실무에 접목**하여 조직의 생산성을 높이는 일에 관심이 많습니다.
ChatGPT, Claude 등 생성형 AI를 활용한 업무 자동화 사례를 발굴하고,
이를 팀원들과 공유하며 함께 성장하는 문화를 만들어가고 있습니다.

> "기술은 도구일 뿐, 중요한 것은 사람과 문제를 이해하는 것입니다."
""")

st.divider()

# ── 연락처 ──────────────────────────────────────────────────
st.markdown('<div class="section-title">📬 연락처</div>', unsafe_allow_html=True)
c1, c2, c3 = st.columns(3)
c1.metric("이메일", "hongildong@kdn.com")
c2.metric("부서", "AI 교육팀")
c3.metric("전화", "031-8045-XXXX")
