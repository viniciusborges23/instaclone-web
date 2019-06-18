import React, { useState, useCallback } from "react";
import api from "../services/api";
import "./New.css";

function New(props) {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  const memoizedHandleSubmit = useCallback(async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("posts", data);

    props.history.push("/");
  }, [author, description, hashtags, image, place, props.history]);

  return (
    <form id="new-post">
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        type="text"
        name="place"
        placeholder="Local do post"
        value={place}
        onChange={e => setPlace(e.target.value)}
      />
      <input
        type="text"
        name="description"
        placeholder="Descricacao do post"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        value={hashtags}
        onChange={e => setHashtags(e.target.value)}
      />

      <button type="button" onClick={memoizedHandleSubmit}>
        Enviar
      </button>
    </form>
  );
}

export default New;
