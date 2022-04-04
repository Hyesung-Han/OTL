import { Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect } from "react";
import { FullPage, Slide as FullSlide } from "react-full-page";

import "../theme/main_css.css";
import "../theme/font/font.css";

/**
 * HSH | 2022.04.01 | v3.0.0
 * @name Main
 * @des Main page
 * 04.01 수정 - LJA
 */

const Main = () => {
  const RootStyle = styled(Grid)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.default, 0.72),

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RootStyle>
      <FullPage controls controlsProps={{ className: "slide-navigation" }}>
        <FullSlide>
          <div className="section-common section-area1">
            <img
              src="/static/img/main1.jpg"
              style={{ width: "100%", height: "100%" }}
              alt="main image"
            />
            <div className="jb-text">
              <div className="jb-text-table">
                <div className="jb-text-table-row">
                  <div className="jb-text-table-cell">
                    <h1 id="main1Title">
                      <span>O</span>
                      <span>n</span>
                      <span>e</span>
                      <span>&nbsp;</span>
                      <span>c</span>
                      <span>a</span>
                      <span>n</span>
                      <br />
                      <span>T</span>
                      <span>a</span>
                      <span>k</span>
                      <span>e</span>
                      <br />
                      <span>l</span>
                      <span>i</span>
                      <span>m</span>
                      <span>i</span>
                      <span>t</span>
                      <span>e</span>
                      <span>d</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FullSlide>
        <FullSlide>
          <div
            className="section-common section-area2"
            style={{ backgroundImage: "url(/static/img/main3.jpg)" }}
          >
            <div className="main2-right">
              <h1 className="word s">
                Create
                <br />
                your
                <br />
                Unique item
              </h1>
            </div>
          </div>
        </FullSlide>
        <FullSlide>
          <div className="section-common section-area3">
            <img
              src="/static/img/main2.png"
              style={{ width: "100%", height: "100%" }}
              alt="main image"
            />
          </div>
        </FullSlide>
      </FullPage>
    </RootStyle>
  );
};

export default Main;
