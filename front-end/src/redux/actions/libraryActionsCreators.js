import axios from "axios";
import store from "../store";

import {
  baseUrl,
  numResults,
  defaultAxiosConfig
} from "../../util/defaultAxiosConfig";
import {
  sortBooksById,
  sanitizeBookData,
  unique
} from "../../util/helperFunctions";

import {
  GET_ALL_BOOKS,
  ADD_BOOKS,
  DELETE_BOOKS,
  EDIT_BOOK,
  SEARCH_FOR_BOOKS,
  SUGGEST_BOOK,
  DELETE_BOOK_BY_ID,
  NEXT_PAGE,
  GET_BOOKS_THIS_PAGE,
  PREVIOUS_PAGE,
  OP_FAILED
} from "../types/libraryActions";

export function getAllBooks() {

  let token = store.getState().auth.user.token
console.log(token)


  try {
    return axios.get(`${baseUrl}/library/${numResults}`,{headers:{"x-access-token":token}}).then(res => {
      console.log("res: ", res)
      if (res.status === 200 && res.data && res.data.length) {
        const allBooks = sanitizeBookData(sortBooksById(res.data));

        const action = {
          type: GET_ALL_BOOKS,
          payload: allBooks
        };
        store.dispatch(action);
        
      }
    });
  } catch (err) {
    const action = {
      type: OP_FAILED,
      payload: err.toString()
    };
    store.dispatch(action);
  }
}

export function addBooks(bookArr) {
  let token = store.getState().auth.user.token
  try {
    return axios.post(`${baseUrl}/library/`, { books: bookArr },{headers:{"x-access-token":token}}).then(res => {
      if (res.status === 200 && res.data === "successfully added books") {
        const addedBooks = sanitizeBookData(sortBooksById(bookArr));
        const action = {
          type: ADD_BOOKS,
          payload: addedBooks
        };
        store.dispatch(action);
      }
    });
  } catch (err) {
    const action = {
      type: OP_FAILED,
      payload: err.toString()
    };
    store.dispatch(action);
    getAllBooks()
  }
}

export async function removeBooks(book) {
  console.log(book)
  let token = store.getState().auth.user.token;
  await axios.delete(`${baseUrl}/library/deleteBy/?title=${book.title}&author=${book.author}`
  ,{headers:{"x-access-token":token}});
  const action = {
    type: DELETE_BOOKS
  };
  store.dispatch(action);
  getAllBooks()
}

export async function editBook(book) {

  let token = store.getState().auth.user.token

  try {
    const books = book.id;
    let res = await axios.put(`${baseUrl}/library/update/${books}`, {
      title: book.title,
      author: book.author,
      pubDate: book.pubDate,
      cover: book.cover,
      numPages: book.numPages,
      rating: book.rating,
      synopsis: book.synopsis
    },{headers:{"x-access-token":token}});
 
    const action = {
      type: EDIT_BOOK,
      payload: book
    };
    console.log(action)
    store.dispatch(action);
    getAllBooks()
  } catch (err) {
    const action2 = {
      type: OP_FAILED,
      payload: err.toString()
    };
    store.dispatch(action2);
  }
}

export async function searchForBooks(book) {
  
  let token = store.getState().auth.user.token
  try {
    const { title, author } = book;
    let res = await axios.get(
      `${baseUrl}/library/searchBy/?title=${title}&author=${author}`,
      {headers:{"x-access-token":token}}
    );
    let matchingBooks = unique(res.data.filter(e => typeof e !== "string"));
    const action = {
      type: SEARCH_FOR_BOOKS,
      payload: matchingBooks
    };
    store.dispatch(action);
  } catch (err) {
    const action = {
      type: OP_FAILED,
      payload: err.toString()
    };
    store.dispatch(action);
  }
}

export async function suggestBook() {
  let token = store.getState().auth.user.token
  let res = await axios.get(`${baseUrl}/library/random`, {headers:{"x-access-token":token}});
  const suggestBooks = sanitizeBookData(res.data);
  console.log(suggestBooks)
  const action = {
    type: SUGGEST_BOOK,
    payload: [suggestBooks.RandomBook]
  };
  store.dispatch(action);
}

export async function deleteBookById(book) {
  console.log(book)
  let token = store.getState().auth.user.token
  let res = await axios.delete(`${baseUrl}/library/deleteById/${book}`,{headers:{"x-access-token":token}});
  const action = {
    type: DELETE_BOOK_BY_ID,
    payload: res.data
  };
  store.dispatch(action);
  getAllBooks()
}

export const nextPage = (bookShelf, resultsPerPage, pageNum) => {
  const lastPage = Math.ceil(bookShelf.length / resultsPerPage);
  if (pageNum < lastPage) {
    const action = {
      type: NEXT_PAGE
    };
    store.dispatch(action);
    getBooksThisPage();
  } else alert("You are on the last page", this.state.pageNum, lastPage);
};

export const previousPage = (bookShelf, resultsPerPage, pageNum) => {
  if (pageNum > 1) {
    const action = {
      type: PREVIOUS_PAGE
    };
    store.dispatch(action);
    getBooksThisPage();
  } else alert("This is the first page");
};

export const getBooksThisPage = () => {
  const action = {
    type: GET_BOOKS_THIS_PAGE
  };
  store.dispatch(action);
};
