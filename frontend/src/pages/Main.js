import {
  Grid,
  Divider,
} from "@mui/material";
import { alpha,styled } from "@mui/material/styles";
import { useEffect } from "react";

// react-full-page
import {FullPage, Slide as FullSlide} from 'react-full-page';
import './main_css.css';

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
    alignItems:"center",
  }));

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <RootStyle>
    <Divider sx={{width:"1200px"}}/>
    <FullPage controls controlsProps={{ className: "slide-navigation" }}>
      <FullSlide>
        <div className="section-common section-area1" >
        <img src="/static/img/main1.png" style={{width:'100%', height:'100%'}} alt="main image"/>
        </div>
        </FullSlide>
       <FullSlide>
       <div className="section-common section-area2">
        <img src="/static/img/main2.png" style={{width:'100%', height:'100%'}} alt="main image"/>
        </div>
        </FullSlide>
        <FullSlide>
        <div className="section-common section-area3">
        <img src="/static/img/main3.png" style={{width:'100%', height:'100%'}} alt="main image"/>
        </div>
      </FullSlide>
     </FullPage>
    </RootStyle>
  );
};

export default Main;
