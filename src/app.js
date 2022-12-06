import * as React from "react";
import { Fragment } from 'react';
import UiViewer from "./ui-components/ui-viewer";

export default function App(props) {

  return (
    <Fragment>
      <UiViewer data={props.data}/>
    </Fragment>
  );
}