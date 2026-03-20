import React, { useEffect, useState } from "react";

export default function ProductModal({
  open,
  mode,
  initialProduct,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ← ЭТО ДОБАВИТЬ

  useEffect(() => {
    if (!open) return;
    setTitle(initialProduct?.title ?? "");
    setPrice(initialProduct?.price != null ? String(initialProduct.price) : "");
    setCategory(initialProduct?.category ?? "");
    setDescription(initialProduct?.description ?? "");
    setStock(initialProduct?.stock != null ? String(initialProduct.stock) : "");
    setImageUrl(initialProduct?.imageUrl ?? ""); // ← ЭТО ДОБАВИТЬ
  }, [open, initialProduct]);

  if (!open) return null;

  const titleText = mode === "edit" ? "Редактирование товара" : "Создание товара";

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!trimmedTitle || !trimmedCategory || !trimmedDescription) {
      alert("Заполните все поля");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Введите корректную цену");
      return;
    }

    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      alert("Введите корректное количество");
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      title: trimmedTitle,
      price: parsedPrice,
      category: trimmedCategory,
      description: trimmedDescription,
      stock: parsedStock,
      imageUrl: imageUrl, // ← ЭТО ДОБАВИТЬ
    });
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal__header">
          <div className="modal__title">{titleText}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Закрыть">
            X
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название товара
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например, Наушники"
              autoFocus
            />
          </label>

          <label className="label">
            Категория
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Например, Аудио"
            />
          </label>

          <label className="label">
            Описание
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание товара"
              rows="3"
            />
          </label>

          <label className="label">
            Цена (₽)
            <input
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Например, 5000"
              inputMode="numeric"
            />
          </label>

          <label className="label">
            Количество на складе
            <input
              className="input"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Например, 15"
              inputMode="numeric"
            />
          </label>

          {/* ← НОВОЕ ПОЛЕ ДЛЯ КАРТИНКИ */}
          <label className="label">
            Ссылка на изображение
            <input
              className="input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://...jpg"
            />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === "edit" ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}