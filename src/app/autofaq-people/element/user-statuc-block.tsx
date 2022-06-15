const UserStatus = (props:any) => {
    return (
        <div key={props.body.name}
            onClick={props.searchChat}
            className="ant-menu-item ant-menu-item-only-child" role="people" title="" data-link="" data-user-id={props.body.id} data-is-duty="false">
            <div className="app-left_menu-item">
                <div className={`${props.status != null ? props.status.color : ''} asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green`}>{props.body.sCnt}</div>
                <span className="">
                    <span className="fs-el-0_6 ms-1">{props.body.name}</span>
                </span>
            </div>
        </div>
    )
}

export default UserStatus