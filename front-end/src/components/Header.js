import React from "react";
import { connect } from "react-redux";
import "../css/bootstrap.min.css";
import "../css/layout.css";
import { logout } from "../redux/actions/authActionCreators";
import {
  Link
} from "react-router-dom";

const Header = props => {
  function openModal(e) {
    props.handleModalToggle(e.target.dataset.modalTarget);
  }

  return (
 
    <div className="container-fluid row header-container">
      <div className="col-xs-2 btn-column">
        <button
          data-modal-target="removeBooksModal"
          onClick={openModal}
          type="button"
          className="btn btn-default btn-remove pull-left"
        >
          <span className="glyphicon glyphicon-minus" /> Remove Books
        </button>
      </div>


      <div className="col-xs-2 btn-column">
        <button
     
          onClick={props.logout}
          type="button"
          className="btn btn-default btn-remove pull-left"
        >
          <span className="glyphicon glyphicon-log-out" /> Logout
        </button>
      </div>
      

      <div className="col-xs-3 text-center">
        <h1 className="library-header">The Library</h1>
        
      </div>
     

      <div className="col-xs-2 btn-column">
        <button
          data-modal-target="addBooksModal"
          onClick={openModal}
          type="button"
          className="btn btn-default btn-add pull-right"
        >
          <span className="glyphicon glyphicon-plus" /> Add Books
        </button>
      </div>
      <div className="col-xs-2 btn-column">
      <button
          type="button"
          className="btn"
        >
         <Link to="/about">About</Link>
        </button>

      </div>
    </div>
  
  );
};


const mapDispatchToProps = dispatch => ({
  logout
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
