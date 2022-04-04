import React from "react";

/**
 * CSW | 2022.03.17 | FIX
 * @name HorizonLine
 * @des HorizonLine 수평선 필요한 곳에 추가
 */

const HorizonLine = ({ text }) => {
  return (
    <div>
      <span
        style={{ background: "#fff", padding: "0 5px", fontWeight: "bold" }}
      >
        {text}
      </span>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px solid #bcbcbc",
          lineHeight: "0.1em",
          margin: "5px 0 10px",
        }}
      ></div>
    </div>
  );
};

export default HorizonLine;
