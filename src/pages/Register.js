import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Backendless from "../services/backendless";
import { validate } from "../utils/validate";
import { notify } from "../utils/toast";
import styles from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        nrp: "",
        password: "",
        confirmPassword: "",
        role: "anggota",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "register"));
    }, [data, touched]);

    const changeHandler = (event) => {
        const { name, value } = event.target;

        if (name === "nrp") {
            const isNumber = /^[0-9]*$/.test(value);
            if (isNumber) {
                setData({ ...data, [name]: value });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!Object.keys(errors).length) {
            try {
                if (data.role === "pemimpin") {
                    const pemimpinExists = await Backendless.Data.of("Users").findFirst({
                        where: "role = 'pemimpin'",
                    });

                    if (pemimpinExists) {
                        notify("akun pemimpin sudah ada.", "error");
                        return;
                    }
                }

                const user = {
                    nrp: data.nrp,
                    password: data.password,
                    name: data.name,
                    role: data.role,
                };

                await Backendless.UserService.register(user);
                notify("Daftar Akun Berhasil!", "success");
                navigate("/login");
            } catch (error) {
                notify("Error: " + error.message, "error");
                setTouched({
                    name: true,
                    nrp: true,
                    password: true,
                    confirmPassword: true,
                });
            }
        } else {
            notify("Invalid data", "error");
            setTouched({
                name: true,
                nrp: true,
                password: true,
                confirmPassword: true,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Daftar Akun</h2>
                <div className={styles.formField}>
                    <label>Nama:</label>
                    <input
                        className={
                            errors.name && touched.name
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        required
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField}>
                    <label>NRP:</label>
                    <input
                        className={
                            errors.nrp && touched.nrp
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="text"
                        name="nrp"
                        value={data.nrp}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        required
                    />
                    {errors.nrp && touched.nrp && <span>{errors.nrp}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password:</label>
                    <input
                        className={
                            errors.password && touched.password
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        required
                    />
                    {errors.password && touched.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <label>Confirm Password:</label>
                    <input
                        className={
                            errors.confirmPassword && touched.confirmPassword
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        required
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <span>{errors.confirmPassword}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={data.role}
                        onChange={changeHandler}
                        className={styles.formInput}
                    >
                        <option value="anggota">Anggota</option>
                        <option value="pemimpin">Pemimpin</option>
                    </select>
                </div>
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Daftar</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
