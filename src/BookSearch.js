import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class BookSearch extends Component {
  state = {
    books: [],
    searchResult: true,
    query: ''
  }

  bindQuery = (value) => {
    this.setState({ query: value})
    this.getSearchResult(value)
  }

  getSearchResult = (query) => {
    if(query !== '') {
      BooksAPI.search(query)
        .then((books) => {
          if(!books.error) {
            this.setState(() => ({ books: books, searchResult: true }))
          } else {
            this.setState(() => ({ books: [], searchResult: false }))
          }
        })
    } else {
      this.setState({ books: []})
    }
  }

  /**
  * This function helps to maintain the state of a book 
  * the in search result that already exist in our book shelf.
  */
  setBookShelf = (book) => {
    const bookInShelf = this.props.books.filter(bookInShelf => bookInShelf.id === book.id)
    return (bookInShelf.length && bookInShelf[0].shelf) || 'none'
  }

  /**
  * This function helps to update the books in state when 
  * a new on is add from the search result.
  */
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((res) => {
        alert('Book have been added')
        this.props.updateBooks()
      })
  }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Enter keyword and hit enter to search by title or author"
                value={this.state.query}
                onChange={(event) => this.bindQuery(event.target.value)} />

            </div>
          </div>
          <div>
            { this.state.searchResult ?
              (
                <div className="search-books-results">
                  <ol className="books-grid">
                    {
                      this.state.books.map((book, index) =>
                          <li key={index}>
                            <Book book={book} shelf={this.setBookShelf(book)} updateShelf={this.updateBookShelf} />
                          </li>)
                    }
                  </ol>
                </div>
              ) :
              (
                <div className="search-books-no-results">
                  <p>No results</p>
                </div>
              )
            }
          </div>
        </div>
    )
  }
}

export default BookSearch
