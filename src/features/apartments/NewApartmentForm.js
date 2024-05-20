import { useAddNewApartmentMutation } from "./apartmentsApiSlice";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import useTitle from "../../hooks/useTitle";

import { MdErrorOutline } from "react-icons/md";

const NewApartmentForm = () => {
    useTitle("Add apartment");

    const [addNewApartment, { isLoading, isSuccess, isError, error }] =
        useAddNewApartmentMutation();

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        rooms: 0,
        price: 0,
        description: "",
    };

    const onSubmit = async (values) => {
        await addNewApartment({
            name: values.name,
            rooms: values.rooms,
            price: values.price,
            description: values.description,
        });
        formik.resetForm();
        navigate("/");
    };

    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length > 99) {
            errors.name = "Name should be less than 99 characters";
        }

        if (!values.rooms) {
            errors.rooms = "Required";
        } else if (values.rooms < 0) {
            errors.rooms = "Number of rooms should be more than 0";
        }

        if (!values.price) {
            errors.price = "Required";
        } else if (values.price < 0) {
            errors.price = "Price should be more than 0";
        }

        if (!values.description) {
            errors.description = "Required";
        } else if (values.description.length > 999) {
            errors.description =
                "Description should be less than 999 characters";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <div className="add-edit-apartment">
            <form
                className="add-edit-apartment__form"
                onSubmit={formik.handleSubmit}
            >
                <label
                    className="add-edit-apartment__form__label"
                    htmlFor="name"
                >
                    Title:
                </label>
                <input
                    className="add-edit-apartment__form__input"
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="add-edit-apartment__form__error">
                        <MdErrorOutline />
                        {formik.errors.name}
                    </div>
                ) : null}

                <label
                    className="add-edit-apartment__form__label"
                    htmlFor="rooms"
                >
                    Rooms:
                </label>
                <input
                    className="add-edit-apartment__form__input"
                    type="number"
                    name="rooms"
                    id="rooms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rooms}
                    min={1}
                    max={100}
                />
                {formik.touched.rooms && formik.errors.rooms ? (
                    <div className="add-edit-apartment__form__error">
                        <MdErrorOutline />
                        {formik.errors.rooms}
                    </div>
                ) : null}

                <label
                    className="add-edit-apartment__form__label"
                    htmlFor="price"
                >
                    Price:
                </label>
                <input
                    className="add-edit-apartment__form__input"
                    type="number"
                    name="price"
                    id="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                    <div className="add-edit-apartment__form__error">
                        <MdErrorOutline />
                        {formik.errors.price}
                    </div>
                ) : null}

                <label
                    className="add-edit-apartment__form__label"
                    htmlFor="description"
                >
                    Description:
                </label>
                <textarea
                    className="add-edit-apartment__form__input"
                    name="description"
                    id="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                    <div className="add-edit-apartment__form__error">
                        <MdErrorOutline />
                        {formik.errors.description}
                    </div>
                ) : null}

                <button
                    className="add-edit-apartment__form__button"
                    type="submit"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};

export default NewApartmentForm;
