import ReactDOM from 'react-dom/client';

const renderApp = (element: any, nameId: string) => {
    const div = document.createElement('div');
    div.id = nameId;
    document.body.prepend(div);

    const root = ReactDOM.createRoot(
        document.getElementById(nameId) as HTMLElement
    );

    root.render(
        element
    );
}

const renderAppAf2 = (genElem: any, nameId1: string, nameId2: string) => {
    const div1 = document.createElement('div');
    div1.id = nameId1;
    document.body.prepend(div1);

    const root1 = ReactDOM.createRoot(
        document.getElementById(nameId1) as HTMLElement
    );

    root1.render(
        genElem
    );

    const div2 = document.createElement('div');
    div2.id = nameId2;
    document.body.prepend(div2);

    const root2 = ReactDOM.createRoot(
        document.getElementById(nameId2) as HTMLElement
    );

    root2.render(
        genElem
    );
}

export { renderApp, renderAppAf2 }