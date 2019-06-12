import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { connect } from 'react-redux';

const DragHandle = sortableHandle(() => <span>::</span>);

const SortableItem = sortableElement(({value}) => (
  <tr>
    {value}
  </tr>
));

const SortableContainer = sortableContainer(({children}) => {
  return <th>{children}</th>;
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
      <div className="topContainer">
      <SortableContainer onSortEnd={this.onSortEnd} axis="xy">
        {this.props.words.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer>
      </div>

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
