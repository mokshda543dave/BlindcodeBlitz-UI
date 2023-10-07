// release v1.0 commit
/* eslint-disable */
import JoditEditor from "jodit-react";
// import "../App.css";
import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  FormGroup,
  Input,
  Navbar,
} from "reactstrap";
import $ from "jquery";
import { useState } from "react";
import {
  doLogout,
  getCurrentUser,
  getSolutionContent,
  isLoggedIn,
  removeSolution,
  saveSolution,
} from "../auth/auth";
import { SubmitSolution } from "../services/solution-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Returnable Component Service
const Bisector = () => {
  // Custom page scripts - jQuery : To disable Key Presses on Dashboard page outside of solution card window
  // Needed and are not removable
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
      {$(window).on("keydown", function (event) {
        if (event.code === "F12") {
          return false;
        } else if (event.code === "F11") {
          return false;
        } else if (event.code === "Escape") {
          return false;
        } else if (event.ctrlKey && event.shiftKey && event.code === "KeyI") {
          return false;
        } else if (event.ctrlKey && event.code === "KeyI") {
          return false;
        } else if (event.ctrlKey && event.shiftKey && event.code === "KeyJ") {
          return false;
        } else if (event.ctrlKey && event.shiftKey && event.code === "KeyC") {
          return false;
        } else if (event.ctrlKey && event.code === "KeyU") {
          return false;
        }
      })}
    </script>
  </head>;

  // Events and functions to be called once on Loading the component
  useEffect(() => {
    // Event listener to log and modify fullscreen status
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement == null) {
        SubmitSolution(getSolutionContent(), currentUserId)
          .then((res) => {
            toast.success("Assessment Submited Automatically");
            doLogout(() => {
              toast.warning("Logged you out");
              removeSolution(() => {
                toast.info("Redirected");
                navigate("/");
                return;
              });
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error);
          });
        document.removeEventListener("fullscreenchange", () => {});
      }
    });

    // Prevent default behaviour of right click on the dashboard page
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Needed constants are as follows:

  // Configuration details for Jodit Editor which is used to reveal code
  const config = {
    enter: "BR",
    toolbar: false,
    iframe: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    width: 400,
    height: 450,
    minHeight: 450,
    maxHeight: 450,
    allowResizeY: false,
    allowResizeX: false,
    readOnly: true,
    disabled: true,
  };

  // The Jodit editor uses a null reference and it is provided by this constant
  const editor = useRef(null);

  // The TinyMCE editor uses a null reference and it is provided by this constant
  const editorRef = useRef(null);

  // Navigator function used for navigation from this page to another after any event call
  const navigate = useNavigate();

  // Current User Id constant
  const currentUserId = getCurrentUser().id;

  // Body CSS for the solution window to keep it black & blind
  const colour =
    "body { background-color:black ;font-family:Helvetica,Arial,sans-serif; font-size:14px; color:transparent; user-select:none;-webkit-user-select:none;-webkit-touch-callout: none;-khtml-user-select: none; -moz-user-select: none;-ms-user-select: none;}";

  // The solution content carrier, think of this as a set of variables needed to assign values of the solution content provided by the user
  // The values assigned to the variables are initial and will be changed on event calls
  const [content, setContent] = useState({
    langQ1: "c++",
    langQ2: "c++",
    langQ3: "c++",
    solutionQ1: "",
    solutionQ2: "",
    solutionQ3: "",
    timeTaken: "",
    flashCount: "0",
  });

  // The variables of the 'content' defined below to be changed saperately

  // Only Sol One will be changed on call of setSolOne()
  const [solOne, setSolOne] = useState(null);
  // Only Sol Two will be changed on call of setSolTwo()
  const [solTwo, setSolTwo] = useState(null);
  // Only Sol Three will be changed on call of setSolThree()
  const [solThree, setSolThree] = useState(null);
  // Only language will be changed on call of setLanguage()
  const [language, setLanguage] = useState({
    langSolOne: "",
    langSolTwo: "",
    langSolThree: "",
  });
  // Time changes
  const [time, setTime] = useState(null);

  // Needed functions are as follows:

  // Question and Solution frame toggler: Changes Question and Solution box on click event
  const switchQuestion = (event) => {
    if ([event.target.id] == "q1") {
      document.getElementById("que1").classList.remove("hide");
      document.getElementById("que2").classList.add("hide");
      document.getElementById("que3").classList.add("hide");
      document.getElementById("sol1").classList.remove("hide");
      document.getElementById("sol2").classList.add("hide");
      document.getElementById("sol3").classList.add("hide");
    }
    if ([event.target.id] == "q2") {
      document.getElementById("que2").classList.remove("hide");
      document.getElementById("que1").classList.add("hide");
      document.getElementById("que3").classList.add("hide");
      document.getElementById("sol2").classList.remove("hide");
      document.getElementById("sol1").classList.add("hide");
      document.getElementById("sol3").classList.add("hide");
    }
    if ([event.target.id] == "q3") {
      document.getElementById("que3").classList.remove("hide");
      document.getElementById("que2").classList.add("hide");
      document.getElementById("que1").classList.add("hide");
      document.getElementById("sol3").classList.remove("hide");
      document.getElementById("sol2").classList.add("hide");
      document.getElementById("sol1").classList.add("hide");
    }
  };

  // Function to handle the select language option on the dashboard
  const fieldChanged = (e) => {
    setLanguage({ ...language, [e.target.id]: e.target.value });
  };

  // Function to handle time change
  const timeChanged = (mins, secs) => {
    setContent({ ...content, timeTaken: 38 - mins + ":" + 60 - secs });
  };

  // Function calls to handle the change in the following variables
  useEffect(() => {
    setContent({ ...content, solutionQ1: solOne });
  }, [solOne]);
  useEffect(() => {
    setContent({ ...content, solutionQ2: solTwo });
  }, [solTwo]);
  useEffect(() => {
    setContent({ ...content, solutionQ3: solThree });
  }, [solThree]);
  useEffect(() => {
    setContent({ ...content, langQ1: language.langSolOne });
  }, [language.langSolOne]);
  useEffect(() => {
    setContent({ ...content, langQ2: language.langSolTwo });
  }, [language.langSolTwo]);
  useEffect(() => {
    setContent({ ...content, langQ3: language.langSolThree });
  }, [language.langSolThree]);
  useEffect(() => {
    setContent({ ...content, timeTaken: time });
  }, [time]);
  // Function call to change the whole content each time on the change of the above mentioned variables of the content set
  useEffect(() => {
    saveSolution(content);
    // console.log(content); uesed for testing
  }, [content]);

  // Submit Form Function: Called on button click
  const submitForm = (e) => {
    e.preventDefault();
    const finalContent = getSolutionContent();
    SubmitSolution(finalContent, getCurrentUser().id)
      .then((res) => {
        stopTimer();
        toast.success("Assessment Submited Successfully");
        doLogout(() => {
          toast.warning("Logged you out");
          removeSolution(() => {
            toast.info("Redirected");
            navigate("/login");
          });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  // Rules acceptance function to show dashboard
  const viewTest = () => {
    document.getElementById("notice").classList.add("noticeHidden");
    document.documentElement.requestFullscreen();
    startTimer();
  };

  // Code revealer function: Called on button click
  const revealCode = () => {
    switch (content.flashCount) {
      case "0":
        setContent({ ...content, flashCount: "1" });
        document.getElementById("revealer").classList.remove("revealHidden");
        setTimeout(() => {
          document.getElementById("revealer").classList.add("revealHidden");
        }, 10000);
        break;
      case "1":
        setContent({ ...content, flashCount: "2" });
        document.getElementById("revealer").classList.remove("revealHidden");
        setTimeout(() => {
          document.getElementById("revealer").classList.add("revealHidden");
        }, 7000);
        break;
      case "2":
        setContent({ ...content, flashCount: "3" });
        document.getElementById("revealer").classList.remove("revealHidden");
        setTimeout(() => {
          document.getElementById("revealer").classList.add("revealHidden");
        }, 5000);
        break;
      default:
        document.getElementById("revealer").classList.remove("revealHidden");
        setTimeout(() => {
          document.getElementById("revealer").classList.add("revealHidden");
        }, 4000);
        return;
    }
  };

  // Watch And Timer management functions:

  let x; // interval variables

  // Function to set 39 mins reverse watch
  const addMinutes = (date, minutes) => {
    return new Date(date + minutes * 60000);
  };

  // Start
  let mins, secs;
  const startTimer = () => {
    const countDownDate = addMinutes(new Date().getTime(), 39);
    x = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      secs = Math.floor((distance % (1000 * 60)) / 1000);
      try {
        document.getElementById("timer").innerHTML = mins + " : " + secs;
        var m = 38 - mins;
        var s = 60 - secs;
        var t;
        if (m < 10 && s < 10) {
          t = "0" + m + ":" + "0" + s;
        } else if (m < 10) {
          t = "0" + m + ":" + s;
        } else if (s < 10) {
          t = m + ":" + "0" + s;
        } else {
          t = m + ":" + s;
        }
        setTime(t);
      } catch (e) {
        window.location.reload(true);
      }
      if (distance < 0) {
        clearInterval(x);
        // Submit data after full time
      }
    }, 1000);
  };

  // Stop
  const stopTimer = () => {
    clearInterval(x);
    document.exitFullscreen();
  };

  // -------------------------------------------------------------------------------------------------------------------------
  // Dashboard Page Body --- The Main Component that will be loaded on the page with the above defined functions and constants
  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="codeBook mt-0 pt-1">
      {/* Deatils Navbar  */}
      <Navbar
        dark
        expand="md"
        className=""
        style={{
          border: "2px transparent solid",
          backgroundColor: "#1a0080",
          minHeight: "50px",
          top: "12vh",
          zIndex: "1",
          color: "#fff",
        }}
      >
        Hello, {isLoggedIn() && getCurrentUser().name}
        <span id="timer"></span>
        {/* Reveal Code Button */}
        <Button
          onClick={revealCode}
          disabled={content.flashCount >= 3}
          color="success"
          className="reveal"
        >
          Reveal Code
        </Button>
      </Navbar>

      <Card
        className="codeBookCard"
        style={{ border: "none", marginTop: "7vh" }}
      >
        <CardBody className="formCard mt-0 mb-4">
          {/* The form that contains all the solution screens and language selectors */}
          <form className="formX" onSubmit={submitForm}>
            <CardGroup className="codeCard mt-4 mb-4">
              {/* Questions Card  */}
              <Card
                className="bx questionBox px-2"
                style={{
                  border: "2px rounded solid",
                  marginRight: "2px",
                  backgroundColor: "",
                }}
              >
                <div className="buttonsConfig">
                  {/* Question toggler button panel */}
                  <CardGroup
                    className="questionToggler"
                    style={{ minHeight: "80px" }}
                  >
                    {/* Button 1 */}
                    <Card className="mx-1 my-1" style={{ border: "none" }}>
                      <Button
                        style={{
                          minHeight: "45px",
                          backgroundColor: "#1a0080",
                        }}
                        id="q1"
                        onClick={switchQuestion}
                      >
                        QUESTION - 1
                      </Button>
                    </Card>

                    {/* Button 2 */}
                    <Card className="mx-1 my-1" style={{ border: "none" }}>
                      <Button
                        style={{
                          minHeight: "45px",
                          backgroundColor: "#1a0080",
                        }}
                        id="q2"
                        onClick={switchQuestion}
                      >
                        QUESTION - 2
                      </Button>
                    </Card>

                    {/* Button 3 */}
                    <Card className="mx-1 my-1" style={{ border: "none" }}>
                      <Button
                        style={{
                          minHeight: "45px",
                          backgroundColor: "#1a0080",
                        }}
                        id="q3"
                        onClick={switchQuestion}
                      >
                        QUESTION - 3
                      </Button>
                    </Card>
                  </CardGroup>
                </div>

                {/* Question 1 */}
                <div id="que1" className="questionDiv">
                  <p>
                    <b>
                      <em>Question 1</em>
                    </b>
                    <br />
                    <br />
                    {/* Question body */}
                    <b>
                      <em>Majority Element : </em>
                    </b>
                    <br />
                    <br />
                    <p>
                      Given an array nums of size n, return the majority
                      element.
                    </p>
                    <p>
                      The majority element is the element that appears more than
                      ⌊n / 2⌋ times. You may assume that the majority element
                      always exists in the array.
                    </p>
                    <p>
                      <em>Example 1:</em>
                      <pre>
                        Input: nums = [3,2,3]
                        <br />
                        Output: 3
                      </pre>
                      <em>Example 2:</em>
                      <pre>
                        Input: nums = [2,2,1,1,1,2,2]
                        <br />
                        Output: 2
                      </pre>
                      <em>Constraints:</em>
                      <pre>
                        <ul>
                          <li>n == nums.length</li>
                          <li>
                            1 &lt;= n &lt= 5 * 10<sup>4</sup>
                          </li>
                          <li>
                            -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                          </li>
                        </ul>
                      </pre>
                    </p>
                    {/* ---- */}
                  </p>
                </div>

                {/* Question 2 */}
                <div id="que2" className="questionDiv hide">
                  <p>
                    <b>
                      <em>Question 2</em>
                    </b>
                    <br />
                    <br />
                    {/* Question body */}
                    <b>
                      <em>Diagonal sum : </em>
                    </b>
                    <br />
                    <br />
                    <p>
                      Given a square matrix of size n×n. Your task is to
                      calculate the sum of its diagonals.
                    </p>
                    <p>
                      You don't need to read or print anything. Your task is to
                      write the function DiagonalSum() which takes the matrix as
                      input parameter and returns the sum of its diagonals
                    </p>
                    <p>
                      <em>Example 1:</em>
                      <pre>
                        Input: matrix = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
                        <br />
                        Output: 6
                      </pre>
                      <em>Example 2:</em>
                      <pre>
                        Input: nums = [[1,2], [3,4]]
                        <br />
                        Output: 10
                      </pre>
                      <em>Constraints:</em>
                      <pre>
                        <ul>
                          <li>1 &lt;= n &lt;= 100</li>
                          <li>1 &lt;= matrix elements &lt;= 10000</li>
                        </ul>
                      </pre>
                    </p>
                    {/* ---- */}
                  </p>
                </div>

                {/* Question 3 */}
                <div id="que3" className="questionDiv hide">
                  <p>
                    <b>
                      <em>Question 3</em>
                    </b>
                    <br />
                    <br />
                    {/* Question body */}
                    <b>
                      <em>
                        Minimum Number of Flips to Make the Binary String
                        Alternating :
                      </em>
                    </b>
                    <br />
                    <br />
                    <p>
                      You are given a binary string s. You are allowed to
                      perform two types of operations on the string in any
                      sequence:
                      <ul>
                        <li>
                          Type-1: Remove the character at the start of the
                          string s and append it to the end of the string.
                        </li>
                        <li>
                          Type-2: Pick any character in s and flip its value,
                          i.e., if its value is '0' it becomes '1' and
                          vice-versa.
                        </li>
                      </ul>
                    </p>
                    <p>
                      Return the minimum number of type-2 operations you need to
                      perform such that s becomes alternating.
                    </p>
                    <p>
                      The string is called alternating if no two adjacent
                      characters are equal.
                      <ul>
                        <li>
                          For example, the strings "010" and "1010" are
                          alternating, while the string "0100" is not.
                        </li>
                      </ul>
                    </p>
                    <p>
                      <em>Example 1:</em>
                      <pre>
                        Input: s = "111000" <br />
                        Output: 2
                      </pre>
                      <code>
                        Explanation: Use the first operation two times to make s
                        = "100011". Then, use the second operation on the third
                        and sixth elements to make s = "101010".
                      </code>
                      <br />
                      <br />
                      <em>Example 2:</em>
                      <pre>
                        Input: s = "010"
                        <br />
                        Output: 0
                        <br />
                      </pre>
                      <code>
                        Explanation: The string is already alternating.
                      </code>
                      <br />
                      <br />
                      <em>Example 3:</em>
                      <pre>
                        Input: s = "1110"
                        <br />
                        Output: 1
                      </pre>
                      <code>
                        Explanation: Use the second operation on the second
                        element to make s = "1010"
                      </code>
                      <br />
                      <br />
                      <em>Constraints:</em>
                      <pre>
                        <ul>
                          <li>n == nums.length</li>
                          <li>
                            1 &lt;= n &lt= 5 * 10<sup>4</sup>
                          </li>
                          <li>
                            -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                          </li>
                        </ul>
                      </pre>
                    </p>
                    {/* ---- */}
                  </p>
                </div>
              </Card>

              {/* Solutions Card  */}
              <Card
                className="bx solutionBox px-2"
                style={{ border: "none", marginLeft: "2px", maxWidth: "90%" }}
              >
                {/* Solution 1 from group */}
                <FormGroup className="mt-2 solution" id="sol1">
                  {/* Language 1 */}
                  <span className="langChoose">
                    <Input
                      className="my-2 py-0"
                      style={{
                        width: "20%",
                        display: "inline-block",
                        textAlign: "center",
                        outline: "none",
                        border: "none",
                      }}
                      type="select"
                      id="langSolOne"
                      placeholder="Language"
                      name="langSolOne"
                      defaultValue={"c++"}
                      onChange={fieldChanged}
                    >
                      <option value={"c++"}>C++</option>
                      <option value={"java"}>Java</option>
                      <option value={"python"}>Python</option>
                    </Input>
                  </span>

                  {/* Editor 1 */}
                  <Card className="txtarea">
                    <Editor
                      apiKey="bgx3j6j885xiq1toxfp8jbpr389dyji48oc6mejvg4s557un"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onEditorChange={setSolOne}
                      id="solOne"
                      init={{
                        browser_spellcheck: false,
                        height: 400,
                        width: 620,
                        min_width: 500,
                        max_width: 650,
                        body_class: "editorTxtArea",
                        setup: (editor) => {
                          editor.on("keydown", (e) => {
                            if (e.code === "F12") {
                              console.log("F12");
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyA") {
                              console.log("CTRL + A");
                              alert(
                                "Text Selection Not Allowed\n\nReloading The Page...."
                              );
                              window.location.reload();
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyS") {
                              console.log("CTRL + S");
                              alert("Text Saving Not Allowed");
                              return false;
                            } else if (
                              e.ctrlKey &&
                              e.shiftKey &&
                              e.code === "KeyI"
                            ) {
                              console.log("CTRL + SHIFT + I");
                              return false;
                            }
                          });
                        },
                        menubar: false,
                        plugins: [],
                        paste_preprocess: function (plugin, args) {
                          args.stopImmediatePropagation();
                          args.stopPropagation();
                          args.preventDefault();
                          console.log("Attempted to paste: ", args.content);
                          args.content = "";
                        },
                        contextmenu_never_use_native: true,
                        contextmenu: false,
                        toolbar: false,
                        statusbar: false,
                        auto_focus: true,
                        content_style: colour,
                      }}
                    />
                  </Card>
                </FormGroup>

                {/* Solution 2 form group */}
                <FormGroup className="mt-2 solution hide" id="sol2">
                  {/* Language 2 */}
                  <span className="langChoose">
                    <Input
                      className="my-2 py-0"
                      style={{
                        width: "20%",
                        display: "inline-block",
                        textAlign: "center",
                        outline: "none",
                        border: "none",
                      }}
                      type="select"
                      id="langSolTwo"
                      placeholder="Language"
                      defaultValue={"c++"}
                      name="langSolTwo"
                      onChange={fieldChanged}
                    >
                      <option value={"c++"}>C++</option>
                      <option value={"java"}>Java</option>
                      <option value={"python"}>Python</option>
                    </Input>
                  </span>

                  {/* Editor 2 */}
                  <Card className="txtarea">
                    <Editor
                      apiKey="bgx3j6j885xiq1toxfp8jbpr389dyji48oc6mejvg4s557un"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onEditorChange={setSolTwo}
                      id="solTwo"
                      init={{
                        browser_spellcheck: false,
                        height: 400,
                        body_class: "editorTxtArea",
                        width: 650,
                        setup: (editor) => {
                          editor.on("keydown", (e) => {
                            if (e.code === "F12") {
                              console.log("F12");
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyA") {
                              console.log("CTRL + A");
                              alert(
                                "Text Selection Not Allowed\n\nReloading The Page...."
                              );
                              window.location.reload();
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyS") {
                              console.log("CTRL + S");
                              alert("Text Saving Not Allowed");
                              return false;
                            } else if (
                              e.ctrlKey &&
                              e.shiftKey &&
                              e.code === "KeyI"
                            ) {
                              console.log("CTRL + SHIFT + I");
                              return false;
                            }
                          });
                        },
                        menubar: false,
                        plugins: [],
                        paste_preprocess: function (plugin, args) {
                          args.stopImmediatePropagation();
                          args.stopPropagation();
                          args.preventDefault();
                          console.log("Attempted to paste: ", args.content);
                          args.content = "";
                        },
                        contextmenu_never_use_native: true,
                        contextmenu: false,
                        toolbar: false,
                        statusbar: false,
                        auto_focus: true,
                        content_style: colour,
                      }}
                    />
                  </Card>
                </FormGroup>

                {/* Solution 3 form group */}
                <FormGroup className="mt-2 solution hide" id="sol3">
                  {/* Language 3 */}
                  <span className="langChoose ">
                    <Input
                      className="my-2 py-0"
                      style={{
                        width: "20%",
                        display: "inline-block",
                        textAlign: "center",
                        outline: "none",
                        border: "none",
                      }}
                      type="select"
                      id="langSolThree"
                      placeholder="Language"
                      name="langSolThree"
                      defaultValue={"c++"}
                      onChange={fieldChanged}
                    >
                      <option value={"c++"}>C++</option>
                      <option value={"java"}>Java</option>
                      <option value={"python"}>Python</option>
                    </Input>
                  </span>

                  {/* Editor 3 */}
                  <Card className="txtarea">
                    <Editor
                      apiKey="bgx3j6j885xiq1toxfp8jbpr389dyji48oc6mejvg4s557un"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onEditorChange={setSolThree}
                      id="solThree"
                      init={{
                        browser_spellcheck: false,
                        height: 400,
                        width: 650,
                        body_class: "editorTxtArea",
                        setup: (editor) => {
                          editor.on("keydown", (e) => {
                            if (e.code === "F12") {
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyA") {
                              console.log("CTRL + A");
                              alert(
                                "Text Selection Not Allowed\n\nReloading The Page...."
                              );
                              // window.location.reload();
                              return false;
                            } else if (e.ctrlKey && e.code === "KeyS") {
                              console.log("CTRL + S");
                              alert("Text Saving Not Allowed");
                              return false;
                            } else if (
                              e.ctrlKey &&
                              e.shiftKey &&
                              e.code === "KeyI"
                            ) {
                              console.log("CTRL + SHIFT + I");
                              return false;
                            }
                          });
                        },
                        menubar: false,
                        plugins: [],
                        paste_preprocess: function (plugin, args) {
                          args.stopImmediatePropagation();
                          args.stopPropagation();
                          args.preventDefault();
                          console.log("Attempted to paste: ", args.content);
                          args.content = "";
                        },
                        contextmenu_never_use_native: true,
                        contextmenu: false,
                        toolbar: false,
                        statusbar: false,
                        auto_focus: true,
                        content_style: colour,
                      }}
                    />
                  </Card>
                </FormGroup>
              </Card>
            </CardGroup>

            {/* Form Submit Button  */}
            <div className="text-center">
              <Button
                color="success"
                style={{
                  marginTop: "-30px",
                  minHeight: "30px",
                }}
                onClick={submitForm}
              >
                SUBMIT ASSESMENT
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Rule Book Window */}
      <div
        className="notice p-5"
        id="notice"
        style={{
          textAlign: "justify",
          display: "block",
          color: "#fff",
          lineHeight: 1.8,
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <h2 className="my-5 text-center" style={{ paddingTop: "1vh" }}>
          Assessment Guidelines
        </h2>
        <p style={{ color: "grey" }}>
          Welcome to Blind Coding assessment! We are committed to ensuring a
          fair and secure assessment environment for all participants. To
          maintain the integrity of the assessment and uphold academic ethics,
          we have established a set of guidelines that you must adhere to during
          the assessment process. These rules aim to promote honesty, prevent
          cheating, and provide a level playing field for everyone involved.
          Please take a moment to review these guidelines carefully before
          proceeding with the assessment.
        </p>
        <ol>
          <li>
            Respect Code of Conduct: Treat this online assessment with utmost
            integrity. Do not engage in any behavior that compromises the
            integrity of the assessment or violates academic ethics.
          </li>
          <li>
            Questions & Switching: There are total of 3 questions. You can
            switch between the different questions during the assessment. Use
            the question navigation buttons provided to switch between questions
            at any time.
          </li>
          <li>
            Time Limit: The entire assessment has a time limit of 39 minutes.
            Please manage your time effectively to complete all the questions
            within the allocated time.
          </li>
          <li>
            Code Flashes: You have a total of three code flashes available
            during the assessment, each with a different duration. The code
            flashes will be visible for the following durations:
            <ul>
              <li>First Flash: 10 seconds</li>
              <li>Second Flash: 7 seconds</li>
              <li>Third Flash: 5 seconds</li>
            </ul>
            All the 3 solutions will be flashed simultaneously.
          </li>
          <li>
            Key Restrictions: All shortcut keys, key compositions and browser
            functionalities, such as opening the inspect window, viewing source
            code window, copy-paste, selecting all etc, are disabled during the
            assessment. Any attempt to access or use these shortcuts may result
            in immediate termination of the assessment.
          </li>
          <li>
            Tab Key: The "Tab" key is specifically disabled in the editor to
            ensure fairness. Pressing the "Tab" key will not result in an
            indentation, instead it will act as a cursor switcher to navigate
            within the assessment window. You should use the "Space" key for
            indentations.
          </li>
          <li>
            Browser Restrictions: Avoid using browser extensions or add-ons that
            may interfere with the assessment. Additionally, switching to other
            tabs or windows during the assessment is not allowed and result in
            abnormal submission and termination of the assessment.
          </li>
          <li>
            No Refresh/Reload: Refrain from refreshing or reloading the
            assessment page during the assessment, as it may result in loss of
            progress.
          </li>
          <li>
            No Retaking: Participants are not allowed to retake the assessment
            once it is submitted, regardless of any technical issues
            encountered.
          </li>
          <li>
            Device Configuration: This is a PC based assessment can not be
            accessed using any mobile device. Ensure that your device screen
            dimension is greater than or equal to 600 x 380. The assessment is
            optimized for screens with this resolution or higher to provide the
            best user experience.
          </li>
          <li>
            No External Assistance: During the assessment, Keep all electronic
            devices not required for the assessment, such as mobile phones,
            tablets, or smartwatches, away from your workspace. Also you are
            strictly prohibited from seeking help from others, using external
            resources, or communicating with anyone to maintain the assessment's
            integrity.
          </li>
          <li>
            Monitoring: The assessment may be monitored using proctoring tools
            to ensure compliance with the rules and maintain a fair assessment
            environment.
          </li>
          <li>
            To successfully submit the assessment click on the "Submit
            Assessment" button.
          </li>
        </ol>
        <p style={{ color: "grey" }}>
          By proceeding with the assessment, you agree to abide by these rules.
          Your commitment to academic integrity and adherence to the assessment
          guidelines will ensure a fair and secure assessment for all
          participants. <br />
          Thank you for your cooperation, and we wish you the best of luck in
          the blind coding assessment!
        </p>
        <div className="text-center my-4">
          <Button onClick={viewTest} color="primary" className="noticeButton">
            I Understand, Take Assessment
          </Button>
        </div>
      </div>

      {/* Reveal Code Window */}
      <div className="revealer revealHidden" id="revealer">
        <CardGroup>
          <Card>
            <CardHeader>Solution 1</CardHeader>
            <JoditEditor
              ref={editor}
              config={config}
              className="joditStyle"
              value={content.solutionQ1}
            />
          </Card>
          <Card>
            <CardHeader>Solution 2</CardHeader>
            <JoditEditor
              style={{ minWidth: "30vw" }}
              ref={editor}
              config={config}
              className="joditStyle"
              value={content.solutionQ2}
            />
          </Card>
          <Card>
            <CardHeader>Solution 3</CardHeader>
            <JoditEditor
              ref={editor}
              config={config}
              className="joditStyle"
              value={content.solutionQ3}
            />
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

export default Bisector;
