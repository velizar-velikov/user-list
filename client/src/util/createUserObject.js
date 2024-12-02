export function createUserObject(id, formData) {
    const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        imageUrl: formData.imageUrl,
        address: {
            country: formData.country,
            city: formData.city,
            street: formData.street,
            streetNumber: formData.streetNumber,
        },
    };
    if (id) {
        user._id = id;
    }

    return user;
}
