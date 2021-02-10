import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./_common.scss";
import App from './app';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();


function renderWeb() {
    ReactDOM.render(<App />, document.getElementById('main'));
}
renderWeb();


if (module.hot) {
    module.hot.accept(
        [
            './app', 
        ], () => {
            console.log('what s up');
            renderWeb();
        }
    );
    module.hot.accept();
}