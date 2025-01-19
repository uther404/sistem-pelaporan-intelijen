export const validate = (data, type) => {
    const errors = {};

    if (!data.nrp) {
        errors.nrp = "NRP harus dimasukkan";
    } else if (!/^\d{8,10}$/.test(data.nrp)) {
        errors.nrp = "masukkan NRP yang valid";
    } else {
        delete errors.nrp;
    }

    if (!data.password) {
        errors.password = "Password harus dimasukkan";
    } else if (data.password.length < 6) {
        errors.password = "Password harus lebih dari 6 karakter";
    } else {
        delete errors.password;
    }

    if (type === "register") {

        if (!data.name.trim()) {
            errors.name = "Name is required";
        } else {
            delete errors.name;
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (data.confirmPassword !== data.password) {
            errors.confirmPassword = "Password doesn't match";
        } else {
            delete errors.confirmPassword;
        }
    }

    return errors;
};
