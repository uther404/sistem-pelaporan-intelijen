import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReportService from "../services/reportService";
import styles from "./ReportDetails.module.css";

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedReport, setEditedReport] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await ReportService.getReportDetails(id);
                setReport(data);
                setEditedReport(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleCopyToClipboard = () => {
        if (report) {
            const textToCopy = `${report.deskripsi}`;
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                })
                .catch(() => {
                    setCopySuccess(false);
                });
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedReport((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const updatedReport = await ReportService.updateReport(id, {
                judul: editedReport.judul,
                deskripsi: editedReport.deskripsi,
            });
            setReport(updatedReport);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Sedang mengambil detail laporan...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.actionButtons}>
                <button onClick={handleBack} className={styles.backButton}>
                    &larr; Kembali
                </button>
                <h1 className={styles.title}>Detail Laporan</h1>
                <button
                    onClick={handleEditToggle}
                    className={styles.editButton}
                >
                    {isEditing ? "Cancel" : "Edit"}
                </button>
            </div>
            <button
                onClick={handleCopyToClipboard}
                className={styles.copyButton}
            >
                Copy
            </button>
            {copySuccess && (
                <p className={styles.copySuccess}>Text has been copied!</p>
            )}
            
            {report && !isEditing && (
                <>
                    <h2>{report.judul}</h2>
                    <p>
                        <strong>Dibuat Pada:</strong> {new Date(report.created).toLocaleString()}
                    </p>
                    <pre className={styles.content}>{report.deskripsi}</pre>
                    {report.dokumentasi && (
                        <div className={styles.imageContainer}>
                            <h3>Dokumentasi</h3>
                            <img
                                src={report.dokumentasi}
                                alt="Report Documentation"
                                className={styles.image}
                            />
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div className={styles.editForm}>
                    <label>
                        Judul:
                        <input
                            type="text"
                            name="judul"
                            value={editedReport.judul || ""}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </label>
                    <label>
                        Deskripsi:
                        <textarea
                            name="deskripsi"
                            value={editedReport.deskripsi || ""}
                            onChange={handleInputChange}
                            className={styles.textarea}
                        />
                    </label>
                    <button
                        onClick={handleSaveChanges}
                        className={styles.saveButton}
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReportDetails;
