import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

const Header = ({ isAuthenticated, onLogout, user }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img
                    src={logo}
                    alt="logo"
                    className={styles.logoImage}
                />
            </div>
            <div className={styles.title}>
                <h1>Sistem Pelaporan Intelijen</h1>
            </div>
            <nav className={styles.nav}>
                {isAuthenticated ? (
                    <>
                        <span className={styles.welcome}>
                            {user?.name || "User"} ({user?.role || "Unknown Role"})
                        </span>
                        {user?.role === "pemimpin" && (
                            <>
                                <Link className={styles.navLink} to="/">
                                    Dashboard
                                </Link>
                                <Link className={styles.navLink} to="/leader-tools">
                                    Laporan
                                </Link>
                            </>
                        )}
                        {user?.role !== "pemimpin" && (
                            <Link className={styles.navLink} to="/report">
                                Buat Laporan
                            </Link>
                        )}
                        <button className={styles.logoutButton} onClick={onLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className={styles.navLink} to="/login">
                            Login
                        </Link>
                        <Link className={styles.navLink} to="/register">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
