import React from "react";

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} />
        <div className="product-stock-badge">
          {product.stock > 0 ? `В наличии: ${product.stock}` : "Нет в наличии"}
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-price-row">
          <span className="product-price">{product.price} ₽</span>
          <div className="product-actions">
            <button className="btn-edit" onClick={() => onEdit(product)}>
              ✎
            </button>
            <button className="btn-delete" onClick={() => onDelete(product.id)}>
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}