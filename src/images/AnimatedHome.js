import React from "react";
import "./AnimatedHome.css";
export default function AnimatedHome() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
    >
      <g
        className="ldl-scale"
        style={{
          transformOrigin: "50% 50%",
          transform: "rotate(0deg) scale(0.8, 0.8)",
        }}
      >
        <g className="ldl-ani">
          <g className="ldl-layer">
            <g
              className="ldl-ani"
              style={{
                transformOrigin: "50px 50px",
                transform: "scale(1)",
              }}
            >
              <path
                fill="#f5e169"
                d="M89.699 49.621L79.268 39.19l-6.662-6.662-19.058-19.059a5.017 5.017 0 0 0-7.095 0L27.394 32.528l-6.662 6.662-10.431 10.431a5.27 5.27 0 0 0 0 7.451l.075.075a5.27 5.27 0 0 0 7.451 0l2.905-2.905v28.296a5.461 5.461 0 0 0 5.461 5.461h11.052a4.263 4.263 0 0 0 4.263-4.263V72.463h16.984v11.274A4.263 4.263 0 0 0 62.755 88h11.052a5.461 5.461 0 0 0 5.461-5.461V54.242l2.905 2.905a5.27 5.27 0 0 0 7.451 0l.075-.075a5.268 5.268 0 0 0 0-7.451zM37.327 83.737a.08.08 0 1 0 0 0zm25.346 0c0 .022.026.026.041.041-.015-.015-.041-.018-.041-.041z"
                style={{ fill: "rgb(249, 138, 37)" }}
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
