import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, isActive) => {
    if (!window.confirm(`${isActive ? '🔴 ЗАБЛОКИРОВАТЬ' : '🟢 РАЗБЛОКИРОВАТЬ'} ПОЛЬЗОВАТЕЛЯ?`)) return;
    try {
      await api.updateUser(userId, { isActive: !isActive });
      loadUsers();
    } catch (err) {
      alert('❌ ОШИБКА ОБНОВЛЕНИЯ');
    }
  };

  const changeRole = async (userId, newRole) => {
    try {
      await api.updateUser(userId, { role: newRole });
      loadUsers();
    } catch (err) {
      alert('❌ ОШИБКА ИЗМЕНЕНИЯ РОЛИ');
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.loading}>ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ...</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👑 АДМИН-ПАНЕЛЬ</h2>
      <p style={styles.subtitle}>УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ</p>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>EMAIL</th>
              <th style={styles.th}>ИМЯ</th>
              <th style={styles.th}>ФАМИЛИЯ</th>
              <th style={styles.th}>РОЛЬ</th>
              <th style={styles.th}>СТАТУС</th>
              <th style={styles.th}>ДЕЙСТВИЯ</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{
                ...styles.tableRow,
                backgroundColor: user.id === currentUser?.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
              }}>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.first_name}</td>
                <td style={styles.td}>{user.last_name}</td>
                <td style={styles.td}>
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    disabled={user.id === currentUser?.id}
                    style={{
                      ...styles.select,
                      backgroundColor: user.role === 'admin' ? '#ec489a' :
                                     user.role === 'seller' ? '#f97316' : '#06b6d4'
                    }}
                  >
                    <option value="user">USER</option>
                    <option value="seller">SELLER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.status,
                    color: user.isActive ? '#06b6d4' : '#f43f5e',
                    fontWeight: '900'
                  }}>
                    {user.isActive ? 'АКТИВЕН' : 'ЗАБЛОКИРОВАН'}
                  </span>
                </td>
                <td style={styles.td}>
                  {user.id !== currentUser?.id && (
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      style={user.isActive ? styles.blockBtn : styles.unblockBtn}
                    >
                      {user.isActive ? 'ЗАБЛОКИРОВАТЬ' : 'РАЗБЛОКИРОВАТЬ'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    padding: '40px', 
    maxWidth: '1300px', 
    margin: '0 auto' 
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px'
  },
  loading: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff', 
    fontSize: '24px',
    padding: '30px 60px',
    borderRadius: '15px',
    border: 'none',
    fontWeight: '900',
    letterSpacing: '2px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '42px',
    fontWeight: '900',
    marginBottom: '10px',
    letterSpacing: '2px'
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '40px'
  },
  tableContainer: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    border: 'none',
    overflowX: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#2d3748'
  },
  tableHeader: {
    borderBottom: '3px solid #667eea'
  },
  th: {
    textAlign: 'left',
    padding: '15px',
    color: '#667eea',
    fontWeight: '900',
    fontSize: '16px',
    letterSpacing: '1px'
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  },
  td: {
    padding: '15px',
    fontWeight: '500',
    fontSize: '15px'
  },
  select: {
    padding: '8px 15px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  status: {
    fontWeight: '900',
    fontSize: '14px'
  },
  blockBtn: {
    background: '#f43f5e',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '13px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  unblockBtn: {
    background: '#06b6d4',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '13px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

// Добавляем hover эффекты через инжекцию стилей
const buttonStyles = `
  .admin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  select:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  tr:hover {
    background-color: #f7fafc !important;
    transform: scale(1.01);
    transition: all 0.3s ease;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = buttonStyles;
  document.head.appendChild(styleSheet);
}