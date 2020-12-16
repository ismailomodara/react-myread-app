import React from 'react'

const bookState = ['currentlyReading', 'wantToRead', 'read', 'none']
const bookStateTitles = {
  currentlyReading: 'Currently reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None'
}

const Book = (props) => {
  const book = props.book;
  const bookImage = book.imageLinks && book.imageLinks.thumbnail
  const bookTitle = book.title && props.book.title
  const bookAuthors = book.authors && book.authors.join(', ')

  return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
             style={{
               width: 128,
               height: 193,
               backgroundImage: `url('${bookImage}')` }}></div>
          <div className="book-shelf-changer">
            <select value={props.shelf} onChange={(event) => props.updateShelf(props.book, event.target.value)}>
              <option value="move" disabled>Move to...</option>
              {bookState.map((state, index) =>
                <option
                  key={index}
                  value={state}
                  >{ bookStateTitles[state] }</option> )}
            </select>
          </div>
        </div>
        <div className="book-title">{ bookTitle }</div>
        <div className="book-authors">{ bookAuthors }</div>
      </div>
  )
}

export default Book
