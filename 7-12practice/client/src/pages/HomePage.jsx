import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>✨ ДОБРО ПОЖАЛОВАТЬ В МАГАЗИН</h1>
        <p style={styles.subtitle}>React + Express + JWT + RBAC</p>
      </div>
      
      {isAuthenticated ? (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>👤 ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Имя:</span>
              <span style={styles.infoValue}>{user?.first_name} {user?.last_name}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Email:</span>
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Роль:</span>
              <span style={{
                ...styles.roleBadge,
                backgroundColor: user?.role === 'admin' ? '#ec489a' : 
                                user?.role === 'seller' ? '#f97316' : '#06b6d4'
              }}>
                {user?.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <p style={styles.welcomeText}>👋 ВОЙДИТЕ В СИСТЕМУ ДЛЯ РАБОТЫ С ТОВАРАМИ</p>
          <div style={styles.buttons}>
            <a href="/login" style={styles.primaryBtn}>ВОЙТИ</a>
            <a href="/register" style={styles.secondaryBtn}>РЕГИСТРАЦИЯ</a>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '1000px', 
    margin: '50px auto', 
    padding: '20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: { 
    background: 'linear-gradient(135deg, #fff 0%, #ffd700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '42px',
    marginBottom: '15px',
    fontWeight: '900',
    letterSpacing: '2px'
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  card: { 
    background: '#ffffff', 
    padding: '40px', 
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  },
  cardTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '900'
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    background: '#f7fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  },
  infoLabel: {
    width: '120px',
    color: '#4a5568',
    fontWeight: '900',
    fontSize: '18px'
  },
  infoValue: {
    color: '#2d3748',
    fontWeight: '700',
    fontSize: '18px'
  },
  roleBadge: {
    padding: '8px 24px',
    borderRadius: '30px',
    color: '#ffffff',
    fontWeight: '900',
    fontSize: '16px',
    letterSpacing: '1px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  welcomeText: {
    color: '#2d3748',
    fontSize: '22px',
    marginBottom: '30px',
    fontWeight: '700',
    textAlign: 'center'
  },
  buttons: { 
    display: 'flex', 
    gap: '20px', 
    justifyContent: 'center'
  },
  primaryBtn: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: '#ffffff', 
    padding: '15px 40px', 
    borderRadius: '12px', 
    textDecoration: 'none',
    fontWeight: '900',
    fontSize: '18px',
    border: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'inline-block'
  },
  secondaryBtn: { 
    background: 'transparent', 
    color: '#667eea', 
    padding: '15px 40px', 
    borderRadius: '12px', 
    textDecoration: 'none',
    fontWeight: '900',
    fontSize: '18px',
    border: '2px solid #667eea',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block'
  }
};

// Добавляем hover эффекты
const homePageStyles = `
  .home-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  }
  
  .info-row:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = homePageStyles;
  document.head.appendChild(styleSheet);
  
  // Добавляем классы для применения hover эффектов
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .primary-btn, .secondary-btn {
      transition: all 0.3s ease;
    }
    .primary-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    .secondary-btn:hover {
      transform: translateY(-3px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
    }
  `;
  document.head.appendChild(styleElement);
}