import React from "react";
// import axios from "axios";
import { connect } from "react-redux"; // import connect from Redux

import Header from "./Header";
import Jumbotron from "./Jumbotron";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DataTable from "./DataTable";
import ModalController from "./modals/ModalController";

import { getAllBooks } from "../redux/actions/libraryActionsCreators";

import "../css/bootstrap.min.css";
import "../css/layout.css";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      bookToEdit: {}
    };
  }

  handleModalToggle = modalToOpen => {
    this.setState({
      modal: modalToOpen
    });
  };

  populateEditModalInputs = id => {
    console.log(id)
    const bookToEdit = {...this.props.bookShelf.find(book => book.bookId  
      === id
      )};
    console.log(bookToEdit)
    bookToEdit.id = id;
    console.log(bookToEdit)
    this.setState({
      bookToEdit
    });
  };

  updateDisplayedBooks = bookArr => {
    if (bookArr) {
      this.setState({
        booksToDisplay: bookArr
      });
    }
  };

  componentDidMount() {
    this.props.getAllBooks();
  }

  render() {
    return (
      <>
         
 
      <div>
   
        <Header handleModalToggle={this.handleModalToggle} />

        <Jumbotron />

        <Navbar
          handleModalToggle={this.handleModalToggle}
          updateDisplayedBooks={this.updateDisplayedBooks}
        />

        <ModalController
          modal={this.state.modal}
          handleModalToggle={this.handleModalToggle}
          bookShelf={this.props.bookShelf}
          bookToEdit={this.state.bookToEdit}
        />

        <DataTable
          booksToDisplay={this.props.booksToDisplay}
          handleModalToggle={this.handleModalToggle}
          populateEditModalInputs={this.populateEditModalInputs}
        />
        <Footer />
      </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log("DISPATCH: ", dispatch, "\nownProps: ", ownProps);
  return {
    getAllBooks
  };
}

function mapStateToProps(state) {
  console.log("CURRENT REDUX STATE: ", state);
  return {
    bookShelf: state.library.bookShelf,
    booksToDisplay: state.library.booksToDisplay
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
