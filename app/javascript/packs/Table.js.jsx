import React, { Component, PropTypes } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { Table } from 'react-bootstrap';

export function CSVTable(props) {
  return (
    <div className="page-csvlist">
      <div className="table-content">
        <Table striped bordered condensed hover>
          <TableHead columns={props.columns} />
          <TableBody displayData={props.displayData} columns={props.columns} />
        </Table>
      </div>
    </div>
  );
}

export default CSVTable;
