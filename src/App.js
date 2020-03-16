import React from "react";
import { Population } from "./Population";
function App() {
  return (
    <div>
      <h1>Visualizing the spread of viruses in population</h1>

      <Population cx={800} cy={200} width={400} height={300} />
    </div>
  );
}

export default App;
