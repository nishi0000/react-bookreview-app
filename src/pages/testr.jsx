import { useState } from "react";
import "./test.scss";

export const Test = () => {
    const [show, setShow] = useState(false)
  return (
    <div>
      <button onClick={() => setShow(true)}>Click</button>
      {show &&(
      <div id="overlay">
      <div id="content">
        <p>これがモーダルウィンドウです。</p>
        <p>
          <button onClick={() => setShow(false)}>close</button>
        </p>
      </div>
      </div>
      )}

    </div>
  );
};

