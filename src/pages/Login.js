import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Backendless from "../services/backendless";
import { validate } from "../utils/validate";
import { notify } from "../utils/toast";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        nrp: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setErrors(validate(data, "login"));
    }, [data, touched]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const nrpRegex = /^\d{6,12}$/;

        if (!data.nrp || !data.password) {
            notify("NRP and Password tidak boleh kosong!", "error");
            return;
        }

        if (!nrpRegex.test(data.nrp)) {
            notify("isi NRP anda", "error");
            return;
        }

        if (!Object.keys(errors).length) {
            try {
                setIsLoading(true);
                const loggedInUser = await Backendless.UserService.login(
                    String(data.nrp),
                    data.password,
                    true
                );
                console.log("Logged In User:", loggedInUser);
                onLogin(loggedInUser);
                notify("Kamu Berhasil Login!", "success");
                navigate("/");
            } catch (error) {
                console.error("Login Error:", error);
                notify(error.message || "Invalid credentials!", "error");
            } finally {
                setIsLoading(false);
            }
        } else {
            notify("Please correct the highlighted errors.", "error");
            setTouched({
                nrp: true,
                password: true,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label htmlFor="nrp">NRP:</label>
                    <input
                        id="nrp"
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
                        placeholder="Masukkan NRP"
                        disabled={isLoading}
                    />
                    {errors.nrp && touched.nrp && <span>{errors.nrp}</span>}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
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
                        placeholder="Masukkan password"
                        disabled={isLoading}
                    />
                    {errors.password && touched.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/register">Daftar</Link>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
