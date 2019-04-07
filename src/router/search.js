import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";

import { testData } from "../utils/MLOperator";
import { genreOptions } from "../utils/Genres"
import { tagOptions } from "../utils/Tags"

const SearchFrom = styled.div`
  width: 100%;
`;

const GenreBox = styled.div`
  display: flex;
  width: 200px;
`;

const LabelGenre = styled.h4`
  padding-right: 10px;
  margin-top: 10px;
`;

const Button = styled.div`
display: block;
position: relative;
float: left;
width: 100px;
padding: 0;
margin: 10px 10px 10px 0;
font-weight: 600;
text-align: center;
line-height: 30px;
color: #1e2638;
background: #e8e8e8;
border-radius: 5px;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTraining: false,
      selectedGenre: "",
      selectedTags: []
    };
  }

  handleChange = selectedGenre => {
    this.setState({ selectedGenre: selectedGenre.value });
  };

  addTags = tags => {
    this.setState({ selectedTags: tags });
  }

  handleSubmit = e => {
    const input = { search: this.state.selectedGenre };

    if(this.state.isTraining){
      return;
    }

    this.setState({ isTraining: true });

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
        this.setState({ isTraining: false });
        console.log("result", result);
      });

    e.preventDefault();
  };

  render() {
    return (
      <SearchFrom>
        <h2>Search</h2>
        <div>
          <LabelGenre>Genre</LabelGenre>
          <Select options={genreOptions} onChange={this.handleChange} />
        </div>
        <div>
          <LabelGenre>Tags</LabelGenre>
          <Select isMulti className="basic-multi-select" onChange={this.addTags} options={tagOptions} />
        </div>
          <Button type="submit" value="Submit" onClick={this.handleSubmit}>
            Submit
          </Button>
      </SearchFrom>
    );
  }
}

export default Search;
