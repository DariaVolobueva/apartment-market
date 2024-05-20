import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import ApartmentsList from "./features/apartments/ApartmentsList";
import EditApartment from "./features/apartments/EditApartment";
import NewApartmentForm from "./features/apartments/NewApartmentForm";
import Prefetch from "./features/auth/Prefetch";
import useTitle from "./hooks/useTitle";

function App() {
    useTitle("Apartment market");
    return (
        <Routes>
            <Route path="/" element={<Layout></Layout>}>
                <Route element={<Prefetch></Prefetch>}>
                    <Route index element={<Public></Public>}></Route>
                    <Route
                        path=":id"
                        element={<EditApartment></EditApartment>}
                    ></Route>
                    <Route
                        path="add"
                        element={<NewApartmentForm></NewApartmentForm>}
                    ></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
