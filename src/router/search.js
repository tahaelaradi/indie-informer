import React, { Component } from "react";
import styled from "styled-components";

const SearchBar = styled.input`
  margin: auto;
`;

const SubmitButton = styled.input`
  border-radius: 0px 8px 8px 0px;
  color: #ffffff;
  background: #3498db;
  text-decoration: none;
  padding: 2px 12px;
`;

class Search extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    const data = { search: this.input.value };

    fetch("http://localhost:4000/search", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });

    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <SearchBar ref={input => (this.input = input)} />
            <SubmitButton type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
