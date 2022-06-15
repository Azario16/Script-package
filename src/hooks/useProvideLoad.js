import { useState } from 'react';


export default  function useProvideLoad() {
    const [load, setLoad] = useState();
    const [DATE, setDate_] = useState();

    const loadin = cb => {
        setLoad(true);
        // cb();
    };

    const loadout = cb => {
        setLoad(false);
        // cb();
    };

    const setDate = cb => {
        setDate_(cb);
        // cb();
    };

    return {
        load,
        DATE,
        loadin,
        loadout,
        setDate
    };
}