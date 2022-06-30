import React, { useState } from "react";
import Zoom from "./zoom.js";

function Integrate() {
  const [createMeeting, setCreateMeeting] = useState(false);

  return (
    <div>
      {createMeeting ? (
        <Zoom />
      ) : (
        <button style={{color: "1px solid #ffffff"}} onClick={() => setCreateMeeting(true)}>Create Meeting</button>
      )}
    </div>
  );
}
export default Integrate;
