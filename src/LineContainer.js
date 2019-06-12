import React from 'react';
import { connect } from 'react-redux';



const LineContainer=(props)=> {
  const renderWords=()=>{
  return  props.words.map(word=>{
      return <span> {word} </span>
    })
  }

  return (
    <div>{renderWords()}</div>
  );
}

function mapStateToProps(state) {
  return {
    words: state.words
  }
}

const HOC = connect(mapStateToProps)
export default HOC(LineContainer);
