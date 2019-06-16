import React, { Component } from "react";
import api from "../services/api";
import "./New.css";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/");
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post">
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do post"
          value={this.state.place}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descricacao do post"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          value={this.state.hashtags}
          onChange={this.handleChange}
        />

        <button type="button" onClick={this.handleSubmit}>
          Enviar
        </button>
      </form>
    );
  }
}

export default New;
