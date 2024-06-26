import { useRef, useState } from 'react';
import {
    useNavigate,
    useLocation,
    Outlet
} from 'react-router-dom';
import { CreateDatePicker } from '../element/datepicker-block'



const Lessons = () => {
    const [STUDENT_ID, setUserId] = useState('')
    const [TEACHER_ID, setChatId] = useState('')


    const START = useRef<string>('')
    const END = useRef<string>('')


    const navigate = useNavigate();
    const location = useLocation()


    return (
        <div>
            <div className="d-flex flex-row justify-content-center">
                <div className="text-center">
                    <div className="d-flex flex-row justify-content-center ">
                        {!(location.pathname === '/chat-list') &&
                            <button type="button" className="btn btn-secondary mb-3 me-2 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                                onClick={async () => {
                                    navigate("/chat-list");
                                }}
                            >сбросить</button>
                        }
                        <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                            onClick={async () => {
                                if (STUDENT_ID !== '' && TEACHER_ID === '') {
                                    navigate("/chat-list/1234");
                                } else if (STUDENT_ID === '' && TEACHER_ID !== '') {
                                    navigate(`/chat-list/chat-id/${TEACHER_ID}`);
                                }
                            }}
                        >Поиск</button>
                    </div>
                    <div className="d-flex flex-row justify-content-center ">
                        <div className="input-group mb-2 w-400px ">
                            <input type="text" form="logs" name="begin" className="form-control me-2"
                                value={STUDENT_ID}
                                placeholder="ID пользователя"
                                onChange={(e) => {
                                    setUserId(e.target.value)
                                }}
                            />
                            <input type="text" form="logs" name="begin" className="form-control ms-2"
                                value={TEACHER_ID}
                                placeholder="ID чата"
                                onChange={(e) => {
                                    setChatId(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <CreateDatePicker date={{ START, END }} />
                </div>
            </div>
            <Outlet context={{ START, END, STUDENT_ID, TEACHER_ID }} />
        </div>

    )
}

export default Lessons