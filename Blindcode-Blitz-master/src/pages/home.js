// release v1.0 commit
import React from "react";
import "./homestyle.css";
import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter";

const Home = () => {
  return (
    <div>
      <CustomNavbar />
      <header>
        <div className="header-content">
          <p className="hx">
            BL<span className="txt-i">1</span>NDC
            <span className="txt-i">0</span>De
            <span className="blitz-txt">blitz</span>
          </p>
          <p className="hxs">A Coding Adventure Awaits!</p>
          <p class="intro">
            Are you ready for the ultimate coding challenge? The Blindcode Blitz
            is a one-of-a-kind event where participants put their coding skills
            to the test, solving problems without seeing the code they write.
            Register now and embrace the thrill of coding blindfolded!
          </p>
          <a className="button" href="/register">
            REGISTER
          </a>
        </div>
      </header>

      <div className="containerz">
        <div className="about-section">
          <h2>About the Competition</h2>
          <p>
            The Blindcode Blitz is an exciting coding competition where
            participants are challenged to solve programming problems without
            seeing the code they are writing. This unique format tests your
            coding skills, memory, and problem-solving abilities in a fun and
            competitive environment.
          </p>
          <br />
          <h2>How to Participate</h2>
          <p>
            To participate in the Blindcode Blitz - blind coding competition,
            simply sign up on the website and await the competition schedule
            announcement. On the day of the competition, log in to your account
            and join the challenge. You'll be given coding problems, and you
            have to write the code from memory to solve them. Each correct
            solution will earn you points, and the participant with the highest
            score will be declared the winner.
          </p>
          <br />
          <h2>Register Now</h2>
          <p>
            Don't miss this incredible opportunity to showcase your coding
            prowess! Register now and get ready for the Blindcode Blitz
            competition.
          </p>
          <p>
            <a href="/register">Click here to register</a>
          </p>
        </div>
        <div className="highlight-section">
          <h2>Ready for the Challenge?</h2>
          <p>
            Do you have what it takes to code without seeing? Blindcode Blitz is
            not just a competition; it's a test of your coding prowess,
            adaptability, and determination. Challenge yourself, have fun, and
            make lasting memories. Join us for an unforgettable coding journey!
          </p>
        </div>
      </div>

      <CustomFooter />
    </div>
  );
};

export default Home;
