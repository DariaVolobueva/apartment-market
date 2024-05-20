import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectApartmentById } from "./apartmentsApiSlice";
import { useDeleteApartmentMutation } from "./apartmentsApiSlice";

import { IoBedOutline } from "react-icons/io5";

const Apartment = ({ id }) => {
    const apartment = useSelector((state) => selectApartmentById(state, id));

    const [
        deleteApartment,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteApartmentMutation();

    const navigate = useNavigate();

    const onDeleteApartmentClicked = async () => {
        await deleteApartment({ id: id });
    };

    if (apartment) {
        const handleEdit = () => navigate(`/${id}`);

        return (
            <div className="card">
                <p className="card__name">{apartment.apartmentName}</p>
                <p className="card__price">$ {apartment.price}</p>
                <p className="card__description">{apartment.description}</p>
                <p className="card__rooms">
                    <IoBedOutline stroke="#fb4343" size={20} />{" "}
                    {apartment.rooms}
                </p>
                <div className="card__buttons">
                    <button className="card__buttons_edit" onClick={handleEdit}>
                        Edit
                    </button>
                    <button
                        className="card__buttons_delete"
                        onClick={onDeleteApartmentClicked}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    } else return null;
};

export default Apartment;
