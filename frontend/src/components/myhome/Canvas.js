import { useState, useEffect, useRef, useContext } from "react";
import Axios from "axios";
import { CommonContext } from "../../context/CommonContext";
import { render } from "react-dom";
import { WindowRounded } from "@mui/icons-material";

/**
 * LJA | 2022.03.29 | ADD
 * @name Canvas
 * @des Canvas 컴포넌트
 */

const Canvas = ({ items }) => {
  const { serverUrlBase } = useContext(CommonContext);

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

  useEffect(async() => {
    if (context) {
      await draw();
    }
  }, [context, items]);

  const draw = async() => {
    let arr = [];
    await items.forEach((item)=> {
      if(item.category_code=='wallpaper') {
        arr.push(item);
      }
    });
    await items.forEach((item)=> {
      if(item.category_code!='wallpaper') {
        arr.push(item);
      }
    });

    arr.forEach(async(item) => {
      const image = new Image();
      image.src = item.src;
      console.log(item.src);
      if (item.category_code == "wallpaper") {
        console.log("벽");
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
              setTimeout(() => {context.drawImage(image, item.x_index, item.y_index, 100, 100)}, 200);
              resolve();
            };
          });
        } else {
          return new Promise(function(resolve) {
            image.onload = () => {
              setTimeout(() => {context.drawImage(image, item.x_index, item.y_index, 200, 200)}, 200);
              resolve();
            };
          });
        }
      }
    });

    arr.forEach(async (row) => {
      /*
      loadedImages[row.src] = img;
      img.src = row.src;

      let width = 0;
      let height = 0;
      let x = 0;
      let y = 0;
      if (row.category_code == "wallpaper") {
        console.log("벽지");
        x = 0; y = 0;
        width = MAX_CANVAS_WIDTH;
        height = MAX_CANVAS_HEIGHT;
      } else {
        console.log("기타");
        x = row.x_index; y = row.y_index;
        if (
          row.category_code == "etc" ||
          row.category_code == "character" ||
          row.category_code == "chair"
        ) {
          width = 100;
          height = 100;
        } else {
          width = 200;
          height = 200;
        }
      }
      context.drawImage(img, x, y, width, height);
      setTimeout(100);
      */
      // await loadImage(row.src).then((image)=>{
      //   console.log(row.category_code+" 차례");
      //   console.log(image);
      // });
      /*
      const image = new Image();
      image.src = row.src;

      image.onload = async() => {
        console.log("지금은 " +row.category_code);
        let width = 0;
        let height = 0;
        let x = 0;
        let y = 0;
        if (row.category_code == "wallpaper") {
          console.log("벽지");
          x = 0; y = 0;
          width = MAX_CANVAS_WIDTH;
          height = MAX_CANVAS_HEIGHT;
        } else {
          console.log("기타");
          x = row.x_index; y = row.y_index;
          if (
            row.category_code == "etc" ||
            row.category_code == "character" ||
            row.category_code == "chair"
          ) {
            width = 100;
            height = 100;
          } else {
            width = 200;
            height = 200;
          }
        }
        context.drawImage(image, x, y, width, height);
      };
      */
    });
  }

  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < items.length; i++) {
      const box = items[i];
      if (
        box.category_code == "etc" ||
        box.category_code == "character" ||
        box.category_code == "chair"
      ) {
        if (
          x >= box.x_index &&
          x <= box.x_index + 100 &&
          y >= box.y_index &&
          y <= box.y_index + 100
        ) {
          dragTarget = box;
          isTarget = true;
          break;
        }
      } else {
        if (
          x >= box.x_index &&
          x <= box.x_index + 200 &&
          y >= box.y_index &&
          y <= box.y_index + 200
        ) {
          dragTarget = box;
          isTarget = true;
          break;
        }
      }
    }
    return isTarget;
  };

  const handleMouseDown = (e) => {
    startX = parseInt(e.nativeEvent.offsetX);
    startY = parseInt(e.nativeEvent.offsetY);
    isDown = hitBox(startX, startY);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;

    const mouseX = parseInt(e.nativeEvent.offsetX);
    const mouseY = parseInt(e.nativeEvent.offsetY);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x_index += dx;
    dragTarget.y_index += dy;
    draw(dragTarget);
  };

  const handleMouseUp = (e) => {
    if (isDown && dragTarget) {
      moveItem(dragTarget);
    }
    dragTarget = null;
    isDown = false;
  };

  const handleMouseOut = (e) => {
    handleMouseUp(e);
  };

  const moveItem = async (item) => {
    try {
      const { data } = await Axios.patch(
        serverUrlBase + `/home/` + item.token_id,
        {
          on_use_yn: 1,
          x_index: item.x_index,
          y_index: item.y_index,
          z_index: 0,
        }
      );
    } catch (e) {
      console.log("아이템 옮기기 에러: " + e);
    }
  };

  return (
    <div className="canvas_wrap">
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default Canvas;
