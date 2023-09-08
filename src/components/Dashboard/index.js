import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // API call get books data
    axios.get('https://s3.amazonaws.com/api-fun/books.json').then((response) => {
      setBooks(response.data);
    });
    const data = JSON.parse(localStorage.getItem('books_data'));
    if (data !== null && Object.keys(data).length !== 0) setBooks(data);
  }, []);

  const handleEdit = title => {
    //After click on edit based book title showing edit form
    const [book] = books.data.books.filter(book => book.title === title);
    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleDelete = title => {
    //deletng based book title
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [book] = books.data.books.filter(book => book.title === title);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${book.title}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        var booksCopy1 = books.data.books.filter(book => book.title !== title);
        var booksCopy={"data": {"books": []}};
        booksCopy.data.books=booksCopy1
        localStorage.setItem('books_data', JSON.stringify(booksCopy));
        setBooks(booksCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            books={books}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          books={books}
          setBooks={setBooks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          books={books}
          selectedBook={selectedBook}
          setBooks={setBooks}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
