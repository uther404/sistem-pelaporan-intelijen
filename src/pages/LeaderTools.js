import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportService from "../services/reportService";
import styles from "./LeaderTools.module.css";

const LeaderTools = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await ReportService.getReports();
                setReports(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus Laporan?")) {
            return;
        }

        try {
            await ReportService.deleteReport(id);
            setReports((prevReports) =>
                prevReports.filter((report) => report.objectId !== id)
            );
            alert("Laporan Berhasil Dihapus.");
        } catch (err) {
            alert("Laporan Gagal Dihapus: " + err.message);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/report/${id}`);
    };

    if (isLoading) {
        return <div>Loading reports...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Daftar Laporan</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.objectId}>
                            <td
                                className={styles.clickable}
                                onClick={() => handleViewDetails(report.objectId)}
                            >
                                {report.judul}
                            </td>
                            <td>{new Date(report.created).toLocaleString()}</td>
                            <td>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(report.objectId)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderTools;
