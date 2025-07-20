import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('curated');
  const [searchQuery, setSearchQuery] = useState('');

  // 샘플 데이터
  const curatedContent = [
    {
      id: 1,
      title: "인공지능의 미래: 2024년 트렌드",
      category: "기술",
      summary: "AI 기술의 최신 동향과 향후 발전 방향에 대한 분석",
      tags: ["AI", "기술트렌드", "미래기술"],
      readTime: "5분",
      saved: true
    },
    {
      id: 2,
      title: "효과적인 학습 방법론",
      category: "교육",
      summary: "과학적으로 입증된 학습 효율성 향상 기법들",
      tags: ["학습법", "교육", "효율성"],
      readTime: "8분",
      saved: false
    },
    {
      id: 3,
      title: "건강한 라이프스타일 가이드",
      category: "건강",
      summary: "일상에서 실천할 수 있는 건강 관리 팁",
      tags: ["건강", "라이프스타일", "웰빙"],
      readTime: "6분",
      saved: true
    }
  ];

  const categories = ["전체", "기술", "교육", "건강", "경제", "문화"];

  console.log(user);
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Knowledge Curator</h1>
          <p>안녕하세요, {user?.nickname || '사용자'}님!</p>
        </div>
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* 유저 닉네임 및 아이콘 */}
          <div className="user-nickname-box" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="프로필"
                className="user-profile-icon"
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: '#ede9fe' }}
              />
            ) : (
              <span style={{ fontSize: 44, width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#ede9fe' }}>👤</span>
            )}
            <span style={{ fontWeight: 600, color: '#7c3aed', fontSize: 18 }}>{user?.nickname || '닉네임'}</span>
          </div>
          <button className="logout-button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </header>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="관심 있는 주제를 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">검색</button>
        </div>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <nav className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'curated' ? 'active' : ''}`}
              onClick={() => setActiveTab('curated')}
            >
              📚 큐레이션된 콘텐츠
            </button>
            <button
              className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              ❤️ 저장된 콘텐츠
            </button>
            <button
              className={`nav-item ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              🎯 맞춤 추천
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ 설정
            </button>
          </nav>

          <div className="category-filter">
            <h3>카테고리</h3>
            <div className="category-list">
              {categories.map(category => (
                <button key={category} className="category-item">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="content-area">
          <div className="content-header">
            <h2>
              {activeTab === 'curated' && '큐레이션된 콘텐츠'}
              {activeTab === 'saved' && '저장된 콘텐츠'}
              {activeTab === 'recommendations' && '맞춤 추천'}
              {activeTab === 'settings' && '설정'}
            </h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 