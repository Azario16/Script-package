import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../core/drag-and-drop'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import '../styles-extension.scss'
// import styleText from '../../style.scss';
import styleText from '../../build/static/css/styles_extension.css';

// const sass = require('sass');

// const styleText = sass.compile("../style-main.scss");
// console.log(styleText.css);

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
        shadowRoot.adoptedStyleSheets = [sheet];
        const root = ReactDOM.createRoot(
            shadowRoot as HTMLElement
        );

        root.render(
            <>
                {children}
            </>
        );
    }
    render() {
        return <div ref={this.attachShadow}></div>;
    }
}

export default function TimTableInfoShadow({ children }: any) {
    const [elemntDrop, setElementDrop] = useState<any>()

    useEffect(() => {
        if (elemntDrop) {
            console.log(elemntDrop)
            console.log(elemntDrop.current)
            createDargAndDrop(elemntDrop, elemntDrop, 'win')
        }
    }, [elemntDrop])

    return <ShadowView >
        {children}
    </ShadowView>
}
