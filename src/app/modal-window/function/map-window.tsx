import { ModalElements } from "../element"
import { ACTIONS_WINDOW } from "./actions-window";
const Modal = ModalElements()

const mapModalWindow = (name: string, paramValue: string, closeModal: any) => {
    switch (name) {
        case ACTIONS_WINDOW.ASSIGN_CHAT:
            const ModalAsignChat = Modal.AssignChat
            return (<ModalAsignChat handleClose={closeModal} param={paramValue} />);
        case ACTIONS_WINDOW.CREATE_CHAT:
            const ModalCreateChat = Modal.CreateChat
            return (<ModalCreateChat handleClose={closeModal} param={paramValue} />);
        // default:
        //     return (arg1: string, arg2: (arg: any) => void) => {

        //         arg2(null)
        //     };
    }
}

export { mapModalWindow }