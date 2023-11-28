import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { createDargAndDrop } from '../core/drag-and-drop'
import { getUrl } from '../service/chrome-runtime.service';
import { Logger } from '../service/logger/logger.service';
export class ShadowView extends React.Component {
    sheet: any = new CSSStyleSheet();

    async loadStyle(): Promise<string> {
        const responseStyleExtension = await fetch(getUrl('static/css/styles_extension.css'));
        const responseMain = await fetch(getUrl('static/css/main.css'));

        const textStyleExtension = await responseStyleExtension.text();
        const textMain = await responseMain.text();

        return textStyleExtension + '\r\n' + textMain;
    }

    attachShadow = async (host: any) => {
        const { children }: any = this.props;
        const shadowRoot = host.attachShadow({ mode: "closed" });

        const styleText = await this.loadStyle();
        this.sheet.replaceSync(styleText);

        shadowRoot.adoptedStyleSheets = [this.sheet];
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
    const [elemntDrop] = useState<any>()

    useEffect(() => {
        if (elemntDrop) {
            Logger.debug(elemntDrop)
            createDargAndDrop(elemntDrop, elemntDrop, 'win')
        }
    }, [elemntDrop])

    return <ShadowView >
        {children}
    </ShadowView>
}
