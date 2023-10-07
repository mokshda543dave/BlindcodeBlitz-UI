// release v1.0 commit
import React from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import "./styles/adm-dash.css";

function Solution({ solution }) {
  const editor = useRef(null);

  const config = {
    buttons: null,
    // autofocus: true,
    enter: "BR",
    toolbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    height: 450,
    minHeight: 350,
    minWidth: 450,
    allowResizeY: false,
    allowResizeX: false,
    color: "transparent",
  };

  // Main Page Body ----------------------------------------------

  return (
    <>
      <div className="userInfo">
        <span className="inf">User Name : {solution.user?.name}</span>
        <span className="inf">Time Taken : {solution.timeTaken}</span>
        <span className="inf">Flash Count : {solution.flashCount}</span>
      </div>

      <div className="solContainer">
        <div className="jodits">
          <div className="card-head">
            Solution Que 1 : Language used - {solution.langQ1}
          </div>
          <JoditEditor
            ref={editor}
            config={config}
            className="joditStyle"
            value={solution.solutionQ1}
          />
        </div>
        <div className="jodits">
          <div className="card-head">
            Solution Que 2 : Language used - {solution.langQ2}
          </div>
          <JoditEditor
            ref={editor}
            config={config}
            className="joditStyle"
            value={solution.solutionQ2}
          />
        </div>
        <div className="jodits">
          <div className="card-head">
            Solution Que 3 : Language used - {solution.langQ3}
          </div>
          <JoditEditor
            ref={editor}
            config={config}
            className="joditStyle"
            value={solution.solutionQ3}
          />
        </div>
      </div>
    </>
  );
}

export default Solution;
