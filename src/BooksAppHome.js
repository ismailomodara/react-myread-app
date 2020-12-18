import React from 'react'
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksAppHome extends React.Component {
  state = {
    shelf: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    shelfTitles: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    }
  }

  componentDidMount() {
    this.sortBookToShelf(this.props.books)
  }

  componentDidUpdate(prevProps) {
    if(this.props.books.length > prevProps.books.length) {
      this.sortBookToShelf(this.props.books)
    }
  }

 /**
  * This function helps to sort books to the respective
  * shelf they belong when the result is gotten from the
  * API response.
  */
  sortBookToShelf = (books) => {
    this.setState(() => ({
      shelf: {
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
      }
    }))
  }

  /**
  * This function helps to update the state of the books in shelves
  */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState((currentState) => ({
          shelf: {
            ...currentState.shelf,
            [book.shelf]: currentState.shelf[book.shelf].filter(bookInShelf => bookInShelf.id !== book.id),
            ...(shelf !== 'none' && { [shelf]: currentState.shelf[shelf].concat([book]) })
          }
        }))
        this.props.updateBooks()
      })
  }

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(this.state.shelf).map(shelf =>
                <BookShelf
                  key={shelf}
                  title={this.state.shelfTitles[shelf]}
                  books={this.state.shelf[shelf]}
                  update={this.updateShelf}
                />
              )}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'><button >Add a book</button></Link>
        </div>
      </div>
    )
  }
}

export default BooksAppHome
