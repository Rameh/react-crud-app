import React from 'react';

const Table = ({ books, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Title</th>
            <th>PurchaseLink</th>
            <th>Publish Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.data ? (
            books.data.books.map((book, i) => (
              <tr>
                <td>{i + 1}</td>
                <td><img src={book.imageUrl} height="100" width="100"/></td>
                <td>{book.title}</td>
                <td><a target="_blank" href={book.purchaseLink}>Purchase</a></td>
                <td>{book.PublishDate} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(book.title)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(book.title)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Books</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
