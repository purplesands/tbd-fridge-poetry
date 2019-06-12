import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { connect } from 'react-redux';


const SortableItem = sortableElement(({value}) => (
  <div className="wordContainer">
    {value}
  </div>
));

const SortableContainer = sortableContainer(({children}) => {
  return <div className="topContainer">{children}</div>;
});

class Sorting extends Component {
  state = {
    words: this.props.words
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.dispatch({ type: "SORT_WORDS", payload:arrayMove(this.props.words, oldIndex,newIndex)})
  };

  render() {
    const {items} = this.state.words;
    return (
      <SortableContainer onSortEnd={this.onSortEnd} axis="xy">
        {this.props.words.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}



function mapStateToProps(state) {
  return {
    words: [...state.words]
  }
}

const HOC = connect(mapStateToProps)
export default HOC(Sorting)
