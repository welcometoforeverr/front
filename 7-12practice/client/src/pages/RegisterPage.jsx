import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>📝 РЕГИСТРАЦИЯ</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.field}>
          <label style={styles.label}>EMAIL:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="user@example.com"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>ИМЯ:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Иван"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>ФАМИЛИЯ:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Петров"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>ПАРОЛЬ:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="********"
          />
        </div>
        
        <button type="submit" style={styles.button}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        
        <p style={styles.link}>
          Уже есть аккаунт? <a href="/login" style={styles.linkA}>ВОЙТИ</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '500px', 
    margin: '80px auto', 
    padding: '20px' 
  },
  form: { 
    background: '#ffffff', 
    padding: '50px', 
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  },
  title: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '30px', 
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '2px'
  },
  field: { 
    marginBottom: '25px' 
  },
  label: {
    color: '#4a5568',
    fontWeight: '900',
    fontSize: '16px',
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '1px'
  },
  input: { 
    width: '100%', 
    padding: '15px', 
    background: '#f7fafc', 
    border: '2px solid #e2e8f0', 
    color: '#2d3748', 
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  button: { 
    width: '100%', 
    padding: '18px', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    fontWeight: '900',
    fontSize: '20px',
    marginTop: '20px',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  error: { 
    background: '#fef2f2', 
    color: '#f43f5e', 
    padding: '15px', 
    borderRadius: '12px', 
    marginBottom: '25px',
    fontWeight: '700',
    fontSize: '16px',
    textAlign: 'center',
    border: '1px solid #fecdd3'
  },
  link: { 
    textAlign: 'center', 
    marginTop: '25px', 
    color: '#4a5568',
    fontSize: '16px',
    fontWeight: '500'
  },
  linkA: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '900',
    textDecoration: 'none',
    marginLeft: '5px',
    transition: 'all 0.3s ease'
  }
};

// Добавляем hover эффекты
const registerStyles = `
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #ffffff;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  form:hover {
    transform: translateY(-5px);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = registerStyles;
  document.head.appendChild(styleSheet);
}