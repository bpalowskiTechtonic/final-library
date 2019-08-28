import React from "react";

import { Table, ButtonGroup } from "reactstrap";
import {
  removeBooks,
  nextPage,
  previousPage,
  getBooksThisPage,
  deleteBookById
} from "../redux/actions/libraryActionsCreators";
import { connect } from "react-redux";
import "../css/bootstrap.min.css";
import "../css/layout.css";

const DataTable = props => {
  function _createTable(bookArr = []) {

    const tableContent = bookArr.map((book, index) => (
      
      <tr key={index} data-book-id={book.bookId}>
        {_createRow(book)}
      </tr>
    ));

    return tableContent;
  }

  function _createHead() {
    const columns = [
      "Title",
      "Author",
      "Cover",
      "Synopsis",
      "Num Pages",
      "Pub Date",
      "Rating",
      "Delete"
    ];

    return columns.map((column, index) => <th key={index}>{column}</th>);
  }

  function _createRow(book) {
    const rowSections = [
      "title",
      "author",
      "cover",
      "synopsis",
      "numPages",
      "pubDate",
      "rating"
    ];

  
    const row = rowSections.map((prop, index) => {

      return (
     
        <td
          key={`${index}-${book}`}
          onClick={() => toggleEditModal(book.bookId)}
          className={prop === "synopsis" ? "synopsis-stretch" : ""}
        >
          
          {_formatTableContent(book, prop)}
        </td>
      );
    });

    row.push(
      <td key={`${rowSections.length + 1}-${book.bookId}`}>
        <input type="checkbox"

         onClick={() => confirmDelete(book.bookId)} 
         />
      </td>
    );
    return row;
  }

  function _formatTableContent(book, prop) {
 
    switch (prop) {
      case "bookId":
        return null;
      case "cover":
        return (
          <img
            src={book[prop] || require("../assets/generic_cover.png")}
            alt="book cover"
            className="tableImg"
          />
        );
      case "rating":
        return _createStars(book[prop]);
      case "synopsis":
        return <p>{book[prop] ? book[prop].slice(0, 40) : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}...</p>;
      default:
        return book[prop];
    }
  }
  function _createStars(rating) {

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span className={`fa fa-star ${i < rating ? "checked" : ""}`} key={i} />
      );
    }
    return <div>{stars}</div>;
  }
  async function toggleEditModal(id) {

    await props.populateEditModalInputs(id);
    props.handleModalToggle("editBookModal");
  }


  function confirmDelete(id) {
 
    let bookToDelete = props.booksToDisplay.find(book => book.bookId === id);

    let proceed = window.confirm(
      `Are you sure you want to delete ${bookToDelete.title}, by ${bookToDelete.author}`
    );
    if (proceed) {
      props.deleteBookById(id);
    }
  }

  const changeForward = () => {
    const { bookShelf, resultsPerPage, pageNum } = props;
    props.nextPage(bookShelf, resultsPerPage, pageNum);
  };
  const changeBackward = () => {
    const { bookShelf, pageNum, resultsPerPage } = props;
    props.previousPage(bookShelf, resultsPerPage, pageNum);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  const tableHead = _createHead();
  const tableBody = _createTable(props.booksToDisplay);

  return (
   
       

    <div id="dataTable">
      <p className="modal-title">Books</p>
   
      <Table>
        <thead>
          <tr>{tableHead}</tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </Table>

      <ButtonGroup className="btn-group">
        <button
          onClick={changeBackward}
          className="btn btn-default"
          type="button"
        >
          Previous Page
        </button>
        <button onClick={scrollToTop} className="btn btn-default" type="button">
          Back to Top
        </button>
        <button
          onClick={changeForward}
          className="btn btn-default"
          type="button"
        >
          Next Page
        </button>
      </ButtonGroup>
    </div>
  );
};

function mapDispatchToProps(dispatch, ownProps) {
  console.log("DISPATCH: ", dispatch, "\nownProps: ", ownProps);
  return {
    removeBooks,
    nextPage: (a, b, c) => nextPage(a, b, c),
    previousPage: (a, b, c) => previousPage(a, b, c),
    getBooksThisPage,
    deleteBookById
  };
}
function mapStateToProps(state) {

  return {
    bookShelf: state.library.bookShelf,
    booksToDisplay: state.library.booksToDisplay,
    pageNum: state.library.pageNum,
    resultsPerPage: state.library.resultsPerPage
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
