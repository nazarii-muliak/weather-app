import "./App.css";
import Canvas from "./components/canvas/Canvas";
import { useState, useEffect } from "react";
import { ImageService } from "./services/ImageService";
import Loader from "./components/modals/Loader/Loader";

function App() {
  useEffect(() => {
  }, []);

  return (
    <div  className="App">
      <Canvas />
    </div>
  );
}

export default App;
