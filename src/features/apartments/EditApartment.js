import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectApartmentById } from "./apartmentsApiSlice";

import EditApartmentForm from "./EditApartmentForm";
import useTitle from "../../hooks/useTitle";

const EditApartment = () => {
    useTitle("Edit Apartment");
    const { id } = useParams();

    const apartment = useSelector((state) => selectApartmentById(state, id));

    const content = apartment ? (
        <EditApartmentForm apartment={apartment}></EditApartmentForm>
    ) : (
        <p>Loading...</p>
    );

    return content;
};

export default EditApartment;
