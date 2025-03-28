import { ClassValue } from "..";
import { OnOperator } from "../../../models/autofaq/operator-statistic.model"

export interface UserStatusProps {
    body: OnOperator;
    status: ClassValue | undefined;
    searchChat: () => void;
}

const UserStatus = (props: UserStatusProps) => {
    return (
        <div key={props.body.operator.fullName}
            onClick={props.searchChat}
            className="ant-menu-item ant-menu-item-only-child" role="people" title="" data-link="" data-user-id={props.body.operator.id} data-is-duty="false">
            <div className="app-left_menu-item">
                <div className={`${props.status != null ? props.status.color : ''} asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green`}>
                    <div style={{ top: "1px", position: "relative" }}>{ props.body.aCnt +  props.body.cCnt}</div>
                </div>
                <span className="">
                    <span className="fs-el-0_6 ms-1">{props.body.operator.fullName}</span>
                </span>
            </div>
        </div>
    )
}

export default UserStatus