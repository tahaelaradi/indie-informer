import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";

import { testData } from "../utils/MLOperator";
import { genreOptions } from "../utils/Genres";
import { tagOptions } from "../utils/Tags";

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
  float: right;
  width: 100px;
  padding: 0;
  margin: 20px 0px 20px 0;
  font-weight: 600;
  text-align: center;
  line-height: 30px;
  color: #1e2638;
  background: #e8e8e8;
  border-radius: 5px;
`;

const Loader = styled.div`
  color: block;
  display: flex;

:after {
  animation: changeContent .8s linear infinite;
  display: block;
  content: "⠋";
  font-size: 50px;
}

@keyframes changeContent {
  10% { content: "⠙"; }
  20% { content: "⠹"; }
  30% { content: "⠸"; }
  40% { content: "⠼"; }
  50% { content: "⠴"; }
  60% { content: "⠦"; }
  70% { content: "⠧"; }
  80% { content: "⠇"; }
  90% { content: "⠏"; }
}
`;

const Result = styled.div`
  margin: 20px 0px;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTraining: false,
      result: "",
      selectedGenre: "",
      selectedTags: []
    };
  }

  handleChange = selectedGenre => {
    this.setState({ selectedGenre: selectedGenre.value });
  };

  addTags = tags => {
    this.setState({ selectedTags: tags });
  };

  handleSubmit = e => {
    const input = { search: this.state.selectedGenre };

    if (this.state.isTraining) {
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
        this.setState({
          isTraining: false,
          trained: true,
          result: result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
      });

    e.preventDefault();
  };

  render() {
    return (
      <SearchFrom>
        <h2>Search</h2>
        <div>
          <LabelGenre>Genre</LabelGenre>
          <Select
            options={genreOptions}
            onChange={this.handleChange}
            isDisabled={this.state.isTraining}
          />
        </div>
        <div>
          <LabelGenre>Tags</LabelGenre>
          <Select
            isMulti
            onChange={this.addTags}
            options={tagOptions}
            isDisabled={this.state.isTraining}
          />
        </div>
        <Button type="submit" value="Submit" onClick={this.handleSubmit}>
          Submit
        </Button>
        {this.state.isTraining ? (
          <div>
            <Loader />
            <h4>
              Training...
            </h4>
          </div>
        ) : null}
        {this.state.result ? (
          <Result>
            <h4>Expected result: {this.state.result} Copies!</h4>
          </Result>
        ) : null}
      </SearchFrom>
    );
  }
}

export default Search;
