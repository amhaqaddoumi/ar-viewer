import * as React from "react";
import ReactDOM from "react-dom";
import ArViewerParser from './parser/parser';
import App from './app';

let parser = new ArViewerParser();

fetch('data.html')
  .then(response => response.text())
  .then(data => parser.parse(data))
  .then(data => ReactDOM.createRoot(document.getElementById('app')).render(<App data={data}/>))
