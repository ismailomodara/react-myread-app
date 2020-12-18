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

  getAllBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/">
          <BooksAppHome
              books={this.state.books}
              updateBooks={this.getAllBooks} />
        </Route>
        <Route path="/search">
          <BookSearch
              books={this.state.books}
              updateBooks={this.getAllBooks} />
        </Route>
      </div>
    )
  }
}

export default App
