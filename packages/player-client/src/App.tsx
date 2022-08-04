import React from "react";
import ConnectionTester from "./components/ConnectionTester/ConnectionTester";
import WorldViewer from "./components/WorldViewer/WorldViewer";
import "./css/baseline.scss";

function App() {
  return (
    <div className="App">
      {/* <ConnectionTester /> */}
      <WorldViewer />
    </div>
  );
}

export default App;
