import React from 'react'
import './App.css'
import { Route } from "react-router-dom";
import BooksAppHome from './BooksAppHome'
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";

class App extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksAppHome
            books={this.state.books}
            updateBooks={this.getAllBooks} />
          )}
        />
        <Route path="/search" render={() => (
          <BookSearch
            books={this.state.books}
            updateBooks={this.getAllBooks} />
          )}
        />
      </div>
    )
  }
}

export default App
