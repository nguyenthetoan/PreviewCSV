import React, { Component, PropTypes } from 'react';

export function TableRow(props) {
  if (!props.columns) return null;
  const view = props.columns.map(index => {
    if( index === "errors") {
      return <td key={index}>{_.join(props.data.errors, '\n') }</td>
    }
    return <td key={index}>{ props.data[index] }</td>
  });
  return (
    <tr>{view}</tr>
  );
}

export default TableRow;
