import { Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";

/**
 * LJA | 2022.03.30 | ADD
 * @name UserRoom
 * @des UserRoom 컴포넌트, 캔버스
 */

const MyRoom = ({ myItems }) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [canvasTag, setCanvasTag] = useState([]);
  const MAX_CANVAS_WIDTH = 680;
  const MAX_CANVAS_HEIGHT = 380;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = MAX_CANVAS_WIDTH;
    canvas.height = MAX_CANVAS_HEIGHT;
    setContext(canvas.getContext("2d"));
    setCanvasTag(canvas);
  }, []);

  useEffect(() => {
    if (context) {
      draw();
    }
  }, [context, myItems]);

  const draw = async() => {
    let arr = [];
    await myItems.forEach((item)=> {
      if(item.category_code=='wallpaper') {
        arr.push(item);
      }
    });
    await myItems.forEach((item)=> {
      if(item.category_code!='wallpaper') {
        arr.push(item);
      }
    });

    arr.forEach(async(item) => {
      const image = new Image();
      image.src = item.src;
      if (item.category_code == "wallpaper") {
        return new Promise(function(resolve) {
          image.onload = () => {
            context.drawImage(image, 0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
            resolve();
          };
        });
      } else {
        if (
          item.category_code == "etc" ||
          item.category_code == "character" ||
          item.category_code == "chair"
        ) {
          return new Promise(function(resolve) {
            image.onload = () => {
              setTimeout(() => {context.drawImage(image, item.x_index, item.y_index, 100, 100)}, 100);
              resolve();
            };
          });
        } else {
          return new Promise(function(resolve) {
            image.onload = () => {
              setTimeout(() => {context.drawImage(image, item.x_index, item.y_index, 200, 200)}, 100);
              resolve();
            };
          });
        }
      }
    });
  }

  if (!myItems) return <>로딩</>;
  return (
    <Grid>
      <div className="canvas_wrap">
        <canvas ref={canvasRef}></canvas>
      </div>
    </Grid>
  );
};

export default MyRoom;
