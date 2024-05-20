import { store } from "../../app/store";
import { apartmentsApiSlice } from "../apartments/apartmentsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        const apartments = store.dispatch(
            apartmentsApiSlice.endpoints.getAllApartments.initiate()
        );

        return () => {
            apartments.unsubscribe();
        };
    }, []);

    return <Outlet></Outlet>;
};

export default Prefetch;
