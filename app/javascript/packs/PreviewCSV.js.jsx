import React from 'react'
import CSVTable from './Table.js'

export default class PreviewCSV extends React.Component {
  constructor(props) {
    super(props);

    this.state = { columns: null, datas: null }
    this.csvFileToJSON = this.csvFileToJSON.bind(this);
    this.CSVToArray = this.CSVToArray.bind(this);
    this.preview = this.preview.bind(this);
  }

  preview() {
    const file = this.fileInput.files[0]
    this.setState({ file: file })
    this.csvFileToJSON(file).then(data => {
      const columns = Object.keys(data ? data[0] : [])
      this.setState({ columns: columns, datas: data })
    })
  }

  csvFileToJSON(file) {
    const self = this;

    return new Promise(function(resolve, reject) {
      var reader = new FileReader();

      reader.onerror = function(err) {
        reject(err);
      };

      reader.onload = function() {
        const data = self.CSVToArray(reader.result);
        resolve(data);
      };
      reader.readAsText(file);
    });
  }

  CSVToArray( strData, strDelimiter ){
      strDelimiter = (strDelimiter || ",");
      let objPattern = new RegExp(
        (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi");

      let arrData = [];
      let headers = [];
      let headersFound = false;
      let headerIndex = 0;

      // Create an array to hold our individual pattern
      let arrMatches = null;

      // Keep looping over the regular expression matches
      while(arrMatches = objPattern.exec( strData )) {
          let strMatchedDelimiter = arrMatches[ 1 ];
          if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
              // add an empty row to our data array.
              arrData.push( {} );
              headersFound = true;
              headerIndex = 0;
          }

          let strMatchedValue;
          if (arrMatches[2]) {
              // We found a quoted value. When we capture
              strMatchedValue = arrMatches[2].replace(new RegExp( "\"\"", "g" ),"\"");
          } else {
              // We found a non-quoted value.
              strMatchedValue = arrMatches[3];
          }

          if (!headersFound) {
            headers.push(strMatchedValue);
          } else {
            arrData[arrData.length -1][headers[headerIndex]] = strMatchedValue;
            headerIndex ++;
          }
      }

      return arrData;
  }

  render() {
    const { columns, datas } = this.state
    return(
      <div>
        <h1>Hi there</h1>
        <label>Choose a CSV file: </label>
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }} />
        <br/>
        <input
          type="button"
          value="PREVIEW"
          onClick={this.preview}
        />
        <CSVTable displayData={datas ? datas : null} columns={columns ? columns : null} />
      </div>
    )
  }
}
