import ReactDOM from 'react-dom/client';

const renderApp = (element: any, nameId: string, appendElement: Element) => {
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


const createButtonSeacrhId = (callback: any) => {
    const items = document.querySelectorAll(".expert-user_details-dt");
    const itemsArray = Array.from(items);

    const filterelem = itemsArray.filter((element: any) => {

        return element.outerText === 'id' || element.outerText === 'nextClass-studentId'
    })
    // renderApp(<ButtonApp/>, 'test')


}

export default createButtonSeacrhId


const ButtonApp = (props: any) => {
    return (
        <div className="expert-user_details-row">
            <dt className="expert-user_details-dt">id</dt>
            <dd className="expert-user_details-dd"><span>5904248</span></dd>
        </div>
    )
}