import React, { useState } from 'react';
import './styles.css';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState(JSON.parse(localStorage.getItem('bookshelf')) || []);

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h1>My Bookshelf</h1>
      <div className="bookshelf">
        {bookshelf.map(book => (
          <div key={book.key} className="book-card">
            <h2>{book.title}</h2>
            <p>Edition Count: {book.edition_count}</p>
            <button onClick={() => removeFromBookshelf(book.key)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="nav-button" onClick={() => window.location.href = '/'}>Back to Search</button>
    </div>
  );
};

export default BookshelfPage;
