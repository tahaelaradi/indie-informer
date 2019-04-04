import React, { Component } from "react";
import styled from "styled-components";
import { testData } from "../utils/MLOperator"

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
    const input = { search: this.input.value };

    fetch("http://localhost:4000/search", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return testData(data, [input.search]);
      })
      .then(result => {
        console.log('result', result)
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
