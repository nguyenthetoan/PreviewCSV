import React, { Component, PropTypes } from 'react';

class TableHead extends Component {
  constructor(props) {
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(column, event) {
    event.preventDefault();
    const { handleSortChange } = this.props;
    if (handleSortChange) {
      this.props.handleSortChange(column);
    }
  }

  render() {
    const view = _.map(this.props.columns, (column) => {
      return (
        <th key={column} onClick={this.handleSortChange.bind(null, column)}>
          {column}
        </th>
      )
    })

    return (
      <thead>
        <tr>{view}</tr>
      </thead>
    );
  }
}

export default TableHead;
