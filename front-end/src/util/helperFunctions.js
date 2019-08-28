export function sortBooksById(books) {
  return books.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function sanitizeBookData(bookArr) {
  for(let i =0; i<bookArr.length; i++){
    if(typeof bookArr[i].rating === "string"){
      bookArr[i].rating = Number(bookArr[i].rating)
    }
  }
return bookArr
}

export function unique(array) {
  return array.filter((e, i, arr) => arr.indexOf(e) === i);
}
