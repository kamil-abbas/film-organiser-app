import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";

class Favorites extends Component {
  state = {
    clicked: false,
    listName: "",
    listId: "",
  };

  inputOnChange = (e) => {
    this.setState({ listName: e.target.value });
  }

  clickHandler = (e) => {
    this.setState({ clicked: true });

    fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "title": this.state.listName,
        "movies": this.props.favoriteMovies,
      }),
    })
    .then(resp => resp.json())
    .then(data => this.setState({ listId: data.id}))
  };

    

  render() {
    return (
      <div className="favorites">
        <input
          placeholder="Введите название списка..."
          className="favorites__name"
          disabled={this.state.clicked ? true : false}
          onChange={this.inputOnChange}
          defaultValue="Yeni siyahı"
        />
        <ul className="favorites__list">
          {this.props.favoriteMovies.map((item, index) => {
            return (
              <div key={index}>
                <li key={item.imdbID} className="favorite__movie">
                  {item.Title} {item.Year}
                  <button
                    type="delete"
                    onClick={() => this.props.delFromFav(item)}
                  >
                    X
                  </button>
                </li>
                <br />
              </div>
            );
          })}
        </ul>
        <a
          href={"/list/" + this.state.listId}
          className={this.state.clicked ? "" : "unvisible__element"}
        >
          Siyahıya baxın.
        </a>
        <button
          type="button"
          className={
            this.state.clicked ? "unvisible__element" : "favorites__save"
          }
          onClick={this.clickHandler}
          disabled={!this.state.listName}
        >
          Сохранить список
        </button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    favoriteMovies: state.favoriteMovies,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    delFromFav: (deletedMovie) =>
      dispatch({ type: "DEL_FROM_FAV", payload: deletedMovie }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Favorites);