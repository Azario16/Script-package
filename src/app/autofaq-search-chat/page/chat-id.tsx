import {
    useNavigate,
    useParams,
    Outlet
} from 'react-router-dom';
import MessageBlock from '../element/message-block'
const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListUser = (props: any) => {


    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate

    const param = useParams()

    return (
        <>
            <div className="card card-body  bg-dark"
            >
                <MessageBlock
                    chatId={param.id}
                    chatOpen={true}
                    operatorName={props.operaotName}
                    eventName={props.eventName}
                    operatorAfId={props.operatorAfId}
                />
            </div>
            <Outlet />
        </>

    )
}
export { navigateComponent };

export default ChatListUser