import React from 'react';
import './App.css';
import { connect } from 'react-redux';


class MainInput extends React.Component {

  state={
    search:"",
    results:[],
    input:""
 }


  handleChange = (e) => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
    console.log(this.state)
  }


  handleSearch=(e)=>{
    this.setState({
      results:[]
    })
    e.preventDefault()
    fetch(`https://thundercomb-poetry-db-v1.p.rapidapi.com/lines/${this.state.search}`, {
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

        if(line.toLowerCase().split(' ').includes(this.state.search.toLowerCase())){
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
  //       if(line.toLowerCase().split(' ').includes(this.state.search.toLowerCase())){
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

  handleCustomWord=(e)=>{
    this.props.dispatch({ type: "ADD_WORD", payload:this.state.input})
  }

  addRandom=(arr)=>{
    arr.map(word=>{
       this.props.dispatch({type:"ADD_WORD", payload:word})
    })
  }

  handleRandom=()=>{
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://www.poemist.com/api/v1/randompoems'
    fetch(proxyUrl+targetUrl)
    .then(r=>r.json())
    .then(r=>{
      this.addRandom(r[0].content.split(' '))
    })
    .catch(e => {
      console.log(e);
      return e;
    });

  }



  render(){
    return (
      <div className="MainInput">
        <input name="search" className="search" placeholder="cool" onChange={this.handleChange}></input>
        <input type="submit" onClick={this.handleSearch}></input>
        <input name="input" className="custom" placeholder="custom" onChange={this.handleChange}></input>
        <input type="submit" onClick={this.handleCustomWord}></input>
        <button onClick={this.handleRandom}>random</button>

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
