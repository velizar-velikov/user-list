import { useState } from 'react';

export default function CreateEdit({ user, onCloseHandler, onSaveNewUser, onSaveEditedUser, isCreate }) {
    const [inputValues, setInputValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        country: user.address?.country,
        city: user.address?.city,
        street: user.address?.street,
        streetNumber: user.address?.streetNumber,
    });

    function onInputChange(e) {
        setInputValues((oldInputValues) => ({ ...oldInputValues, [e.target.name]: e.target.value }));
    }

    // TODO: think of e solution that does not render create form with undefined values(omits the value attr altogether)

    return (
        <div className="overlay">
            <div onClick={onCloseHandler} className="backdrop"></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>{isCreate ? 'Add User' : 'Edit User'}</h2>
                        <button onClick={onCloseHandler} className="btn close">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="xmark"
                                className="svg-inline--fa fa-xmark"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={isCreate ? onSaveNewUser : onSaveEditedUser} data-id={user?._id}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={inputValues.firstName}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={inputValues.lastName}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-envelope"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={inputValues.email}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        value={inputValues.phoneNumber}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span>
                                    <i className="fa-solid fa-image"></i>
                                </span>
                                <input
                                    onChange={onInputChange}
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={inputValues.imageUrl}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-map"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={inputValues.country}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-city"></i>
                                    </span>
                                    <input onChange={onInputChange} id="city" name="city" type="text" value={inputValues.city} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-map"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="street"
                                        name="street"
                                        type="text"
                                        value={inputValues.street}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-house-chimney"></i>
                                    </span>
                                    <input
                                        onChange={onInputChange}
                                        id="streetNumber"
                                        name="streetNumber"
                                        type="text"
                                        value={inputValues.streetNumber}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit">
                                Save
                            </button>
                            <button onClick={onCloseHandler} id="action-cancel" className="btn" type="button">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
