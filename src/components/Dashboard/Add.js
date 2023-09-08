import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ books, setBooks, setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [purchaseLink, setPurchaseLink] = useState('');
  const [PublishDate, setPublishDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!title || !imageUrl || !purchaseLink || !PublishDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = books.length + 1;
    const newBook = {
      id,
      title,
      imageUrl,
      purchaseLink,
      PublishDate,
    };

    books.data.books.push(newBook);
    localStorage.setItem('books_data', JSON.stringify(books));
    setBooks(books);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${title}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Book</h1>
        <label htmlFor="firstName">Title</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <label htmlFor="purchaseLink">Purchase Link</label>
        <input
          id="purchaseLink"
          type="text"
          name="purchaseLink"
          value={purchaseLink}
          onChange={e => setPurchaseLink(e.target.value)}
        />
        <label htmlFor="PublishDate">PublishDate</label>
        <input
          id="PublishDate"
          type="text"
          name="PublishDate"
          value={PublishDate}
          onChange={e => setPublishDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
