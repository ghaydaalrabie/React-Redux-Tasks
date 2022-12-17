import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Button, Card } from "antd";

import TooltipPopover from "./TooltipPopover";
import Image from "./Image";
import Portal from "./Portal";
import Orwah from './Orwah'
import Majdsh from './Majdsh'
import Majdatt from "./Majdatt";
import Nancy from "./Nancy";
import Jameel from "./Jameel";
import Hasan from "./Hasan";
import Qassem from "./Qassem";
import Hamze from "./Hamze";
import Emran from "./Emran";
import Mohammed from "./Mohammed";
import Ziad from "./Ziad";
import Amani from "./Amani";
const btnRef = React.createRef();



const App = () => {
  const [isOn, setOn] = useState(false); // toggles dropdown visibility
  const [coords, setCoords] = useState({}); // takes current button coordinates

  const updateTooltipCoords = button => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };





  

  return (
    <Card style={{ ...styles.card }}>
      <Image />
      <Button
        ref={btnRef}
        style={styles.button}
        onClick={e => {
          updateTooltipCoords(e.target);
          setOn(!isOn);
        }}
      >
        Coach Osaid
      </Button>
      {isOn && (
        <Portal>
          <TooltipPopover
            coords={coords}
            updateTooltipCoords={() =>
              updateTooltipCoords(btnRef.current.buttonNode)
            }
          >
            <div>
              أنا اعترض , ,مدام فيه غيدا انسى الوضع 
            </div>
          </TooltipPopover>
        </Portal>
      )}

   <Orwah/>
    <Majdsh/>
    <Majdatt/>
<Nancy/>
<Jameel/>
<Hasan/>
<Qassem/>
<Hamze/>
<Emran/>
<Mohammed/>
<Ziad/>
<Amani/>
    </Card>
  );
};

const styles = {
  card: { padding: 100, maxWidth: 2500, margin: "" },
  button: { display: "flex", marginLeft: "auto", marginBottom: 12, top:420, right:1050 }
};

ReactDOM.render(<App />, document.getElementById("react-root"));
