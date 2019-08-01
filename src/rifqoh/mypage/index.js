import React from "react";
import backgroundImg from "../imgs/background_img.jpg";

function aboutPage() {
  return (
    <div className="col-md-6 offset-md-3 mt-2">
      <div className="bg-white p-3 rounded">
        <div className="img-user display-table-cell">
          <img
            src={backgroundImg}
            alt="oye olalekan johnson"
            className="img-md rounded"
          />
        </div>
        <div className="username display-table-cell">
          <span>Oye Olalekan Johnson</span>
          <br />
          <span className="text-mute mt-2">Built shopstack.co</span>
        </div>

        <div className="mt-1">
          <p>
            I am versatile in API development and integration, Web app design
            and implementation. I have the ability to multitask and thrive in an
            environment that constantly embrace new technologies. I have a good
            eye for design, as a result, I craft and build nice interfaces
            whenever I build apps.
          </p>
          <p>
            A self-taught Full-Stack Web developer with over 4 years experience
            learning, and exploring (Frontend and backend) using technologies
            like HTML5 and its APIs, CSS3, jQuery, React, Javascript(es5 and
            es6), Python, Django, Flutter, Dart and other technologies.
          </p>
          <div className="social-connect text-center">
            <a
              href="https://web.facebook.com/oye.olalekan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook fa-lg mr-4" />
            </a>
            <a
              href="https://twitter.com/jboy_oye"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-lg mr-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/oye-johnson-4b9345111/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default aboutPage;
