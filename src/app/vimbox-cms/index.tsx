import React from 'react';
import ReactDOM from 'react-dom/client';
import ShadowView from '../../shadow-view'

const СreateCmsButton = () => {
    window.onload = () => {
        setTimeout(function () {
            createDivIdForReact();
            StatusAutofaqPeopleRender();
        }, 1000)
    }
}

function innerTextElement(node: HTMLElement): string {
    return node.innerText; // Property 'innerText' does not exist on 'T'
}

// Создаем див на странице 
function outerHTMLElement(node: HTMLElement): void {
    node.outerHTML = `
    <div id="appReact" class="paddding-custom-cms"></div>
    `;
}

function createDivIdForReact() {
    let elm: HTMLElement = document.createElement('div');
    const appenfElem = document.querySelector('[class="root -type-primary"]');
    if (appenfElem !== null) {
        appenfElem.append(elm)
    }
    outerHTMLElement(elm)
}

async function StatusAutofaqPeopleRender() {
    class CmsButton extends React.Component<{}, {
        room: any,
        error: any,
        data: any,
        isLoadedData: any,
        isLoaded: any,
    }>{
        constructor(props: any) {
            const room: any = window.location.href.split('/')[6].split('?')[0]
            super(props);
            this.state = {
                room: room,
                error: null,
                data: [],
                isLoadedData: false,
                isLoaded: false,
            };

        }

        async componentDidMount() {
            let roomInfo = await this.getRoomInfo()
        }
        getStepUuid(elm: any) {
            console.log(elm)
            const stepElement: HTMLElement = document.querySelector('[class="title"] > span.title')!
            let stepName: string;

            stepName = innerTextElement(stepElement);
            // const stepName = document.querySelector('[class="title"] > span.title').innerText
            console.log(stepName)
            console.log(this.state.data)
            this.state.data.map((body: any, count: any) => {
                if (body.name === stepName) {
                    elm.target.className = "bg-success btn"
                    const url = `https://content.vimbox.skyeng.ru/cms/stepStore/update/stepId/${body.stepUuid}`
                    copyText(url)
                    setTimeout(colorButton, 1000, elm)
                }
            })
            function copyText(text: any) {
                navigator.clipboard.writeText(text);
            }
            function colorButton(elm: any) {
                elm.target.className = "btn"
            }
        }
        async getRoomInfo() {
            //console.log("getRoomInfo")
            const locationPath = window.location.pathname.split('/')[2]
            const url = `https://api-${locationPath}.skyeng.ru/api/v2/rooms/${this.state.room}`;
            let roomInfoRes = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            let roomInfo = await roomInfoRes.json();
            console.log(roomInfo)
            let roomHW = roomInfo['homeworkCards'][0].themes[0].cards;
            let roomLesson = roomInfo['lessonCards'][0].themes[0].cards;
            let roomConcat = roomHW.concat(roomLesson)

            this.setState({
                isLoaded: true,
                data: roomConcat
            })
            return roomInfo['homeworkCards'];
        }
        render() {
            //console.log('Render')
            const { error, isLoaded }: any = this.state;
            if (error) {
                return <div>Ошибка: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Загрузка...</div>;
            } else {
                return (
                    <div id="url-cms-copy" className="btn" onClick={this.getStepUuid.bind(this)}>
                        Ссылка в CMS
                    </div>
                )

            }
        }
    }

    const root = ReactDOM.createRoot(
        document.querySelector('#appReact') as HTMLElement
    );

    root.render(
        <ShadowView>
            <CmsButton />
        </ShadowView>
    );
}

export default СreateCmsButton