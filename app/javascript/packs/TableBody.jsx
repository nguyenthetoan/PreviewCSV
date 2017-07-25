import React, { Component, PropTypes } from 'react';
import TableRow from './TableRow';

export function TableBody(props) {
  const view = _.map(props.displayData, (row, index) => {
    return (
      <TableRow key={index} data={row} columns={props.columns} />
    );
  })
  return (
    <tbody>
      {view}
    </tbody>
  );
}

export default TableBody;
