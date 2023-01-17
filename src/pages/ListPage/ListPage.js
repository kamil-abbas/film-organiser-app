import React, { Component } from "react";
import "./ListPage.css";

class ListPage extends Component {
  state = {
    id: "",
    title: "",
    movies: [],
  };

  componentDidMount() {
    console.log("comp");
    const id = this.props.match.params.id;
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((resp) => resp.json())
      .then((data) => {console.log(data);
        this.setState({ id: data.id });
        this.setState({ title: data.title });
        this.setState({ movies: data.movies });
      });

    // TODO: запрос к сервер на получение списка
    // TODO: запросы к серверу по всем imdbID
  }
  render() {
    console.log("return");
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {this.state.movies.map((item) => {
            return (
              <li key={item.imdbID}>
                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">
                  {item.Title} ({item.Year})
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListPage;
