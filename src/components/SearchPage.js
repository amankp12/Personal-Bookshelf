import React, { useState, useEffect } from 'react';
import './styles.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [bookshelf, setBookshelf] = useState(JSON.parse(localStorage.getItem('bookshelf')) || []);

  useEffect(() => {
    if (query) {
      fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(response => response.json())
        .then(data => setResults(data.docs));
    }
  }, [query]);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h1>Book Search</h1>
      <input 
        type="text" 
        placeholder="Search for a book" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <div className="results">
        {results.map(book => (
          <div key={book.key} className="book-card">
            <h2>{book.title}</h2>
            <p>Edition Count: {book.edition_count}</p>
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
      <button className="nav-button" onClick={() => window.location.href = '/bookshelf'}>Go to My Bookshelf</button>
    </div>
  );
};

export default SearchPage;
