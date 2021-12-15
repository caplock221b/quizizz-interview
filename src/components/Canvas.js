import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackward,
  faForward,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const generateRandomString = () => {
  const arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  let str = "";
  for (let i = 0; i < 6; i++) {
    const num = Math.floor(Math.random() * 16);
    str += arr[num];
  }
  return str;
};

const Canvas = ({ items }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    const l = items.length;
    if (l > 0) {
      const width = 1000 / l - (l - 1) * 5;
      let maxEl = items[0];
      for (let i = 1; i < l; i++) {
        if (items[i] > maxEl) {
          maxEl = items[i];
        }
      }
      const height = 500 / maxEl;

      const indexedList = items.map((el) => {
        return {
          num: el,
          id: generateRandomString(),
        };
      });

      setDimensions({ width, height });
      setList(indexedList);
    }
  }, [items]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  //   [83, 6, 63, 84, 9, 14, 90, 24, 17]

  const insertionSort = () => {
    const duplicateList = [...list];
    for (let i = 1; i < duplicateList.length; i += 1) {
      document.getElementById(duplicateList[i].id).style.backgroundColor =
        "hsl(330, 100%, 50%)";
      let newInd = i;
      for (let j = i; j > 0; j -= 1) {
        if (duplicateList[j - 1].num > duplicateList[j].num) {
          const temp = duplicateList[j - 1].num;
          duplicateList[j - 1].num = duplicateList[j].num;
          duplicateList[j].num = temp;

          const tempId = duplicateList[j - 1].id;
          duplicateList[j - 1].id = duplicateList[j].id;
          duplicateList[j].id = tempId;
          newInd--;
        }
        setList(duplicateList);
      }
      document.getElementById(duplicateList[newInd].id).style.backgroundColor =
        "hsl(160, 100%, 50%)";
    }
  };

  return (
    <>
      <div className="canvas">
        {list.length &&
          list.map((bar, ind) => (
            <div
              id={bar.id}
              key={bar.id}
              style={{
                width: `${dimensions.width}px`,
                height: `${bar.num * dimensions.height}px`,
                left: `calc(${ind * dimensions.width}px + ${ind * 5}px)`,
              }}
              className="bar"
            ></div>
          ))}
      </div>
      {list.length > 0 && (
        <div className="controls">
          <button type="button">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faPlay} onClick={() => insertionSort()} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      )}
    </>
  );
};

export default Canvas;
