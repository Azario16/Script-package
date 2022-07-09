import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../core/drag-and-drop'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import '../styles-extension.scss'
// import styleText from '../../style.scss';
import styleText from '../../build/static/css/styles_extension.css';
// import styleText from '../../build/static/css/style_main.css';

// const test: any = styleText
// const styleGreen = document.createElement('style');
// styleGreen.type = 'text/css';
// styleGreen.appendChild(document.createTextNode(test));

// import './style.scss'

const sheet: any = new CSSStyleSheet();
export class ShadowView extends React.Component {
    componentDidMount() {
        // console.log('test')
    }
    attachShadow = (host: any) => {
        const { children }: any = this.props;
        const shadowRoot = host.attachShadow({ mode: "closed" });
        sheet.replaceSync(styleText);
        // console.log(styleText)

        shadowRoot.adoptedStyleSheets = [sheet];

        // shadowRoot.appendChild(styleGreen);

        const root = ReactDOM.createRoot(
            shadowRoot as HTMLElement
        );

        root.render(
            <>
                {/* <link rel="stylesheet" href="https://build.extension-test.ru/static/css/styles_extension.css"></link> */}
                {children}

            </>
        );
    }
    render() {
        // console.log('ShadowView render')
        return <div ref={this.attachShadow}></div>;
    }
}

export default function TimTableInfoShadow({ children }: any) {
    // const { children }: any = props;
    // const elemntDrop = useRef<any>()
    const [elemntDrop, setElementDrop] = useState<any>()

    useEffect(() => {
        if (elemntDrop) {
            console.log(elemntDrop)
            console.log(elemntDrop.current)
            createDargAndDrop(elemntDrop, elemntDrop, 'win')
        }
        // console.log('App useEffect')
        // const mainElem = document.querySelector('#main-window-tt')
        // const moveElem = document.querySelector('#main-window-tt')
    }, [elemntDrop])

    // const { children }: any = props;
    // console.log('App render')
    return <ShadowView >
        {children}
    </ShadowView>
}

// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );

// root.render(
//     <App />
// );

