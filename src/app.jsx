import React from "react";
import ReactDOM from "react-dom";
import { init } from "./3dmodels/room";

init();

const App = () => {
    return (
        <div>
            Hello world
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));