import React from "react";
import { connect } from "react-redux";
import {
  searchForBooks,
  suggestBook
} from "../redux/actions/libraryActionsCreators";
import "../css/bootstrap.min.css";

import "../css/layout.css";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: ""
    };
  }

  scrollToTable = () => {
    document.getElementById("dataTable").scrollIntoView({ behavior: "smooth" });
  };

  updateVal = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  searchForBooks = async e => {
    e.preventDefault();
    const { title, author } = this.state;
    if (title && author) {
      let booksFound = await this.props.searchForBooks({
        title,
        author
      });
      this.props.updateDisplayedBooks(booksFound);
      this.scrollToTable();
    }
  };

  suggestBook = () => {
    this.props.suggestBook();
  };

  render() {
    return (
      <nav className="row navbar navbar-default navbar-container">
        <form id="search-form" className="navbar-form text-center">
          <div className="form-group col-xs-2">
            <button
              onClick={this.scrollToTable}
              className="btn btn-default pull-left navbar-btn vert-spacing"
              type="button"
            >
              Show All Books
            </button>
          </div>
       

          <div className="form-group navbar-inputs-stack col-xs-8">
            <input
              onChange={this.updateVal}
              value={this.state.title}
              placeholder="Title"
              className="form-control"
              type="text"
              name="title"
            />

            <input
              onChange={this.updateVal}
              value={this.state.author}
              placeholder="Author"
              className="form-control"
              type="text"
              name="author"
            />

            <button
              data-modal-target="bookDisplayModal"
              onClick={this.searchForBooks}
              type="submit"
              className="btn btn-default navbar-btn"
            >
              Search
            </button>
          </div>

          <div className="form-group col-xs-2">
            <button
              data-modal-target="bookDisplayModal"
              onClick={this.suggestBook}
              className="btn btn-default pull-right navbar-btn vert-spacing"
              type="button"
            >
              Suggest Book
            </button>
          </div>

        </form>
      </nav>
    );
  }
}

function mapDispatchToProps() {
  return {
    searchForBooks,
    suggestBook,

  };
}

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
