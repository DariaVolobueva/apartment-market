import Apartment from "./Apartment";
import Sort from "../../components/Sort";
import Filter from "../../components/Filter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllApartmentsQuery } from "./apartmentsApiSlice";

const ApartmentsList = () => {
    const [sort, setSort] = useState("");
    const [filterRooms, setFilterRooms] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        let newUrl = "";
        if (sort) {
            newUrl += newUrl ? `$sort=${sort}` : `sort=${sort}`;
        }
        if (filterRooms) {
            newUrl += newUrl
                ? `&filter=${filterRooms}`
                : `filter=${filterRooms}`;
        }
        setUrl(newUrl);
    }, [sort, filterRooms]);

    console.log("url", url);
    const {
        data: apartments,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllApartmentsQuery(url);

    const navigate = useNavigate();

    const onAddApartmentClicked = () => {
        navigate("/add");
    };

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p>{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = apartments;

        const apartmentCard = ids?.length
            ? ids.map((id) => {
                  return <Apartment key={id} id={id}></Apartment>;
              })
            : null;

        content = apartmentCard;
    }

    return (
        <div className="main">
            <button
                className="main__add-button"
                onClick={onAddApartmentClicked}
            >
                ADD NEW APARTMENT
            </button>
            <div className="main__filtering">
                <Sort sort={sort} setSort={setSort} />
                <Filter
                    filterRooms={filterRooms}
                    setFilterRooms={setFilterRooms}
                />
            </div>
            <div className="apartments">{content}</div>
        </div>
    );
};

export default ApartmentsList;
