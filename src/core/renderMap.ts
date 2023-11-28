// import React from 'react';
import ReactDOM from 'react-dom/client';
const GetterBackground = () => {
    return {
        renderMain: async () => {
             ReactDOM.createRoot(
                document.getElementById('main') as HTMLElement
            );
            // root.render(
            //     <UserInfo />
            // );
        },
        // renderTimeTable: async (userId: any, callback: any) => {


        // },
        // renderAutoFaq: async (userId: any, callback: any) => {

        // }

    }
}

export { GetterBackground }




