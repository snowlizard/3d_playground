import React from "react";
import ReactDOM from "react-dom";
import { init } from "./3dmodels/room";
import { Aya } from "./3dmodels/aya";

init();
Aya();

const App = () => {
    return (
        <div>
            Hello world
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));