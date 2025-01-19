import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Backendless from "./services/backendless";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportForm from "./pages/ReportForm";
import ReportDetails from "./pages/ReportDetails";
import LeaderTools from "./pages/LeaderTools";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await Backendless.UserService.getCurrentUser();
                if (currentUser) {
                    setIsAuthenticated(true);
                    setUser(currentUser);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to check session:", error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const handleLogin = (loggedInUser) => {
        setIsAuthenticated(true);
        setUser(loggedInUser);
    };

    const handleLogout = async () => {
        try {
            await Backendless.UserService.logout();
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const ProtectedRoute = ({ children }) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return !isAuthenticated ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <div className="app-container">
                <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    {user?.role === "pemimpin" ? (
                                        <Dashboard user={user} />
                                    ) : (
                                        <Navigate to="/report" />
                                    )}
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leader-tools"
                            element={
                                <ProtectedRoute>
                                    {user?.role === "pemimpin" ? (
                                        <LeaderTools />
                                    ) : (
                                        <Navigate to="/report" />
                                    )}
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/report"
                            element={
                                <ProtectedRoute>
                                    <ReportForm user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/report/:id"
                            element={
                                <ProtectedRoute>
                                    <ReportDetails user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login onLogin={handleLogin} />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
