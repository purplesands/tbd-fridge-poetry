import React from 'react';
import './App.css';
import { connect } from 'react-redux';


class MainInput extends React.Component {

  state={
    input:"",
    results:[]
 }

  handleChange=(e)=>{
    this.setState({
      input:e.target.value
    })
  }

  handleSearch=(e)=>{
    this.setState({
      results:[]
    })
    e.preventDefault()
    fetch(`https://thundercomb-poetry-db-v1.p.rapidapi.com/lines/${this.state.input}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "thundercomb-poetry-db-v1.p.rapidapi.com",
        'X-RapidAPI-Key':"4d90375dd6mshbfa9800b3e51019p1ebfd0jsn92f7ebed7441"
      }}).then(r=>r.json())
      .then(r=>{
        this.sortResponse(r)
      })
  }
  renderLine=(line)=>{
    return line.split(' ').map(word=>{
      return <span className="word" onClick={this.handleClick} value={word}> {word} </span>
    })
  }
  renderResults=()=>{
    return this.state.results.map(r=>{
        return <div className="line">{this.renderLine(r)}</div>
      })
    }

  sortResponse=(arr)=>{
    for(let i=0;i<arr.length;i++){
      arr[i].lines.forEach(line=>{

        if(line.toLowerCase().split(' ').includes(this.state.input.toLowerCase())){
          this.setState({
            results:[...this.state.results, line]
          })
        }})

    }
  }

  // sortResponse=(arr)=>{
  //   for(let i=0;i<arr.length;i++){
  //     arr.forEach(line=>{
  //       debugger
  //       if(line.toLowerCase().split(' ').includes(this.state.input.toLowerCase())){
  //         this.setState({
  //           results:[...this.state.results, line]
  //         })
  //       }})
  //
  //   }
  // }


  handleClick=(e)=>{
    this.props.dispatch({ type: "ADD_WORD", payload:e.target.innerText})
  }


  render(){
    return (
      <div className="MainInput">
        <input className="search" placeholder="cool" onChange={this.handleChange}></input>
        <input type="submit" onClick={this.handleSearch}></input>
        <div>{this.state.input}</div>
        <ul>{this.renderResults()}</ul>

      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    words:state.words
 }
}

const HOC = connect(mapStateToProps)
export default HOC(MainInput);
