import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ books, selectedBook, setBooks, setIsEditing }) => {
  //const title = selectedBook.title;

  const [title, setTitle] = useState(selectedBook.title);
  const [imageUrl, setImageUrl] = useState(selectedBook.imageUrl);
  const [purchaseLink, setPurchaseLink] =useState(selectedBook.purchaseLink);
  const [PublishDate, setPublishDate] = useState(selectedBook.PublishDate);

  const handleUpdate = e => {
    e.preventDefault();

    if (!title || !imageUrl || !purchaseLink || !PublishDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const book = {
      title,
      imageUrl,
      purchaseLink,
      PublishDate,
    };

    for (let i = 0; i < books.data.books.length; i++) {
      if (books.data.books[i].title === title) {
        books.data.books.splice(i, 1, book);
        break;
      }
    }
    localStorage.setItem('books_data', JSON.stringify(books));
    setBooks(books);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${book.title}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Book</h1>
        <label htmlFor="firstName">Title</label>
        <input
          id="title"
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
        <label htmlFor="PublishDate">Publish Date</label>
        <input
          id="PublishDate"
          type="text"
          name="PublishDate"
          value={PublishDate}
          onChange={e => setPublishDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
