import React, { Component } from 'react';
import './MovieItem.css';
import {connect} from 'react-redux';

class MovieItem extends Component {

    state = {
        clicked: false
    }

    clickHandler = (e) => {
        this.setState({ clicked: true })
        this.props.addToFav(this.props)
    }

    render() {
        const { Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={this.clickHandler} type="button" className="movie-item__add-button" disabled={this.state.clicked}>Добавить в список</button>
                </div>
            </article>
        );
    }
}


const mapDispatchtoProps = (dispatch) => {
    return{
        addToFav:(favoriteMovie)=>dispatch({type: "ADD_TO_FAV", payload: favoriteMovie})
    }
}

export default connect(null, mapDispatchtoProps) (MovieItem);
