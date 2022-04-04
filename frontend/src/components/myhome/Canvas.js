import { useState, useEffect, useRef, useContext } from "react";
import Axios from "axios";
import { CommonContext } from "../../context/CommonContext";

/**
 * LJA | 2022.03.29 | ADD
 * @name Canvas
 * @des Canvas 컴포넌트
 */
const Canvas = ({items}) => {
    const { serverUrlBase } = useContext(CommonContext);

    const canvasRef = useRef(null);
    const[context, setContext] = useState(null);
    const[canvasTag, setCanvasTag] = useState([]);
    const MAX_CANVAS_WIDTH = 680;
    const MAX_CANVAS_HEIGHT = 380;

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = MAX_CANVAS_WIDTH;
        canvas.height = MAX_CANVAS_HEIGHT;
        setContext(canvas.getContext('2d'));
        setCanvasTag(canvas);

        // console.log("items", JSON.parse(JSON.stringify(items)));
        // console.log("items length", items.length);
    }, []);

    useEffect(() => {
        if(context) {
            draw();
        }
    }, [context, items]);

    const draw = () => {
        context.clearRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
        items.forEach((item)=>{
            const image = new Image();
            image.src = item.src;
            if(item.category_code == 'wallpaper') {
                image.onload = () => {
                    context.drawImage(image, 0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
                }
            }
        });
        items.forEach((item)=>{
            const image = new Image();
            image.src = item.src;
            if(item.category_code != 'wallpaper') {
                if(item.category_code == 'etc' || item.category_code == 'character' || item.category_code == 'chair') {
                    image.onload = () => {
                        context.drawImage(image, item.x_index, item.y_index, 100, 100);
                    }
                } else {
                    image.onload = () => {
                        context.drawImage(image, item.x_index, item.y_index, 200, 200);
                    }
                }
            }
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
          if (x >= box.x_index && x <= box.x_index + 100 && y >= box.y_index && y <= box.y_index + 100) {
            dragTarget = box;
            isTarget = true;
            break;
          }
        }
        return isTarget;
      }

    const handleMouseDown = e => {
        startX = parseInt(e.nativeEvent.offsetX);
        startY = parseInt(e.nativeEvent.offsetY);
        isDown = hitBox(startX, startY);
    }

    const handleMouseMove = e => {
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
    }

    const handleMouseUp = e => {
        if(isDown && dragTarget) {
            moveItem(dragTarget);
        }
        dragTarget = null;
        isDown = false;
    }

    const handleMouseOut = e => {
        handleMouseUp(e);
    }

    const moveItem = async(item) => {
        try {
          const {data} = await Axios.patch(serverUrlBase + `/home/`+item.token_id, {
              on_use_yn: 1,
              x_index:item.x_index,
              y_index:item.y_index,
              z_index:0,
          })
        } catch(e) {
          console.log("아이템 옮기기 에러: " + e)
        }
      }
    
    return (
        <div className="canvas_wrap">
            <canvas 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
                ref = {canvasRef}>
            </canvas>
        </div>
    );
}

export default Canvas;

/*
캔버스만들기
https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
drawImage
https://webisfree.com/2018-07-02/[html5]-canvas-%EC%9A%94%EC%86%8C%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
draggable
https://stackoverflow.com/questions/15036386/make-image-drawn-on-canvas-draggable-with-javascript
https://konvajs.org/docs/react/Drop_Image.html
https://www.youtube.com/watch?v=6dpxrBTESvQ
*/