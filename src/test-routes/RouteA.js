import React from "react";
import { dynaData } from "../lorem";

export default class RouteA extends React.Component {
  render() {
    return (
      <div>
        Hi Hello 4!
        <div style={{ maxWidth: 300 }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{dynaData(1)}</p>
        </div>
      </div>
    );
  }
}
