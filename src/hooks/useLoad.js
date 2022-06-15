import { useContext } from "react";
import LoadContext from "../context/LoadProvider";

const useLoad = () => {
    return useContext(LoadContext);
}

export default useLoad;