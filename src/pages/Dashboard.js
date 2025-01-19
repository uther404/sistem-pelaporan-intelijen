import React, { useEffect, useState } from "react";
import ReportService from "../services/reportService";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [reportSummary, setReportSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportSummary = async () => {
            try {
                setIsLoading(true);
                const reports = await ReportService.getReports();
                const totalReports = reports.length;
                const recentReports = reports.slice(0, 5);

                setReportSummary({
                    totalReports,
                    recentReports,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportSummary();
    }, []);

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Dashboard</h1>
            {reportSummary && (
                <div className={styles.summary}>
                    <h2>Daftar Laporan</h2>
                    <p>Total Laporan: {reportSummary.totalReports}</p>
                </div>
            )}
            {reportSummary?.recentReports?.length > 0 && (
                <div className={styles.recentReports}>
                    <h2>Laporan Terkini</h2>
                    <ul>
                        {reportSummary.recentReports.map((report) => (
                            <li key={report.objectId}>
                                <strong>{report.judul}</strong> -{" "}
                                {new Date(report.created).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;