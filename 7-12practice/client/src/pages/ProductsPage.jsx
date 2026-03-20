import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: ''
  });
  const { isSeller, isAdmin } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('🗑️ УДАЛИТЬ ТОВАР?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('❌ ОШИБКА УДАЛЕНИЯ');
    }
  };

  const openCreate = () => {
    setEditingProduct(null);
    setFormData({ title: '', category: '', description: '', price: '' });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const response = await api.updateProduct(editingProduct.id, formData);
        setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
      } else {
        const response = await api.createProduct(formData);
        setProducts([...products, response.data]);
      }
      setShowForm(false);
    } catch (err) {
      alert('❌ ОШИБКА СОХРАНЕНИЯ');
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.loading}>ЗАГРУЗКА ТОВАРОВ...</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>📦 ТОВАРЫ</h2>
        {isSeller && (
          <button onClick={openCreate} style={styles.addButton}>+ ДОБАВИТЬ ТОВАР</button>
        )}
      </div>

      {products.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>😢 ТОВАРОВ ПОКА НЕТ</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <div key={product.id} style={styles.card}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p style={styles.category}>{product.category.toUpperCase()}</p>
              <p style={styles.description}>{product.description}</p>
              <div style={styles.priceRow}>
                <span style={styles.price}>{product.price.toLocaleString()} ₽</span>
              </div>
              {(isSeller || isAdmin) && (
                <div style={styles.actions}>
                  <button onClick={() => openEdit(product)} style={styles.editBtn}>✏️ РЕДАКТИРОВАТЬ</button>
                  {isAdmin && (
                    <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>🗑️ УДАЛИТЬ</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>
              {editingProduct ? '✏️ РЕДАКТИРОВАТЬ ТОВАР' : '➕ НОВЫЙ ТОВАР'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="НАЗВАНИЕ ТОВАРА"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
                required
              />
              <input
                placeholder="КАТЕГОРИЯ"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={styles.input}
                required
              />
              <textarea
                placeholder="ОПИСАНИЕ"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{...styles.input, minHeight: '100px'}}
                required
              />
              <input
                type="number"
                placeholder="ЦЕНА"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                style={styles.input}
                required
              />
              <div style={styles.modalActions}>
                <button type="submit" style={styles.saveBtn}>СОХРАНИТЬ</button>
                <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>ОТМЕНА</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    padding: '40px', 
    maxWidth: '1300px', 
    margin: '0 auto',
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
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '40px' 
  },
  pageTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '36px',
    margin: 0,
    fontWeight: '900',
    letterSpacing: '2px'
  },
  addButton: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: '#ffffff', 
    border: 'none', 
    padding: '15px 30px', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '18px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px',
    background: '#ffffff',
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  emptyText: {
    color: '#4a5568',
    fontSize: '24px',
    fontWeight: '700'
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
    gap: '30px' 
  },
  card: { 
    background: '#ffffff', 
    padding: '25px', 
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  productTitle: {
    fontSize: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 15px 0',
    fontWeight: '900'
  },
  category: { 
    color: '#f97316', 
    fontSize: '16px',
    fontWeight: '900',
    marginBottom: '15px',
    letterSpacing: '1px'
  },
  description: {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontWeight: '500'
  },
  priceRow: { 
    display: 'flex', 
    justifyContent: 'flex-end', 
    margin: '20px 0' 
  },
  price: { 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '28px', 
    fontWeight: '900',
  },
  actions: { 
    display: 'flex', 
    gap: '15px', 
    marginTop: '20px' 
  },
  editBtn: { 
    flex: 1,
    background: '#06b6d4', 
    color: '#ffffff', 
    border: 'none', 
    padding: '12px', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '16px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },
  deleteBtn: { 
    flex: 1,
    background: '#f43f5e', 
    color: '#ffffff', 
    border: 'none', 
    padding: '12px', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '16px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },
  modal: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(0,0,0,0.8)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },
  modalContent: { 
    background: '#ffffff', 
    padding: '40px', 
    borderRadius: '20px', 
    width: '90%', 
    maxWidth: '600px',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '900',
    textAlign: 'center'
  },
  input: { 
    width: '100%', 
    padding: '15px', 
    margin: '10px 0', 
    background: '#f7fafc', 
    border: '2px solid #e2e8f0', 
    color: '#2d3748', 
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  modalActions: { 
    display: 'flex', 
    gap: '15px', 
    marginTop: '30px' 
  },
  saveBtn: { 
    flex: 1, 
    padding: '15px', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '18px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },
  cancelBtn: { 
    flex: 1, 
    padding: '15px', 
    background: '#e2e8f0', 
    color: '#4a5568', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontWeight: '900',
    fontSize: '18px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  }
};

// Добавляем hover эффекты
const productsStyles = `
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  input:focus, textarea:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #ffffff;
  }
  
  .add-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = productsStyles;
  document.head.appendChild(styleSheet);
}