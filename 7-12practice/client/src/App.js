import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/AdminPage';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isAdmin, isSeller } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'seller' && !isSeller) {
    return <Navigate to="/" />;
  }

  return children;
};

function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>✨ SHOP</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>ГЛАВНАЯ</Link>
          <Link to="/products" style={styles.link}>ТОВАРЫ</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" style={styles.link}>АДМИНКА</Link>
          )}
          {isAuthenticated ? (
            <>
              <span style={{
                ...styles.user,
                backgroundColor: user?.role === 'admin' ? '#ec489a' : 
                               user?.role === 'seller' ? '#f97316' : '#06b6d4'
              }}>
                {user?.first_name} ({user?.role})
              </span>
              <button onClick={logout} style={styles.logoutBtn}>ВЫЙТИ</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>ВХОД</Link>
              <Link to="/register" style={styles.link}>РЕГИСТРАЦИЯ</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

const styles = {
  nav: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    padding: '15px 0', 
    borderBottom: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  navContainer: { 
    maxWidth: '1300px', 
    margin: '0 auto', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 30px' 
  },
  logo: { 
    color: '#ffffff', 
    fontSize: '28px', 
    fontWeight: '900', 
    textDecoration: 'none',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
  },
  links: { 
    display: 'flex', 
    gap: '30px', 
    alignItems: 'center' 
  },
  link: { 
    color: '#ffffff', 
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '1px',
    padding: '8px 0',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  user: { 
    color: '#ffffff', 
    marginRight: '15px',
    fontWeight: '900',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  logoutBtn: { 
    background: '#ffffff', 
    color: '#764ba2', 
    border: 'none', 
    padding: '8px 20px', 
    borderRadius: '30px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  }
};

// Добавляем глобальные стили через инжекцию в head
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    min-height: 100vh;
  }
  
  a:hover {
    color: #ffd700 !important;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .logo-link:hover {
    transform: scale(1.05);
  }
`;

// Инжектим глобальные стили
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default App;