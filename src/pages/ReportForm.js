import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../utils/toast";
import ReportService from "../services/reportService";
import styles from "./ReportForm.module.css";

const ReportForm = () => {
    const [template, setTemplate] = useState("");
    const [customReport, setCustomReport] = useState("");
    const [judul, setJudul] = useState("");
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const templates = {
        template1: `Mohon ijin komandan, melaporkan bahwa`, 
    };

    const handleTemplateChange = (event) => {
        const selectedTemplate = event.target.value;
        setTemplate(selectedTemplate);
        setCustomReport(templates[selectedTemplate] || "");
    };

    const handleCustomReportChange = (event) => {
        setCustomReport(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!judul.trim() || !customReport.trim()) {
            notify("Judul and isi Laporan tidak boleh kosong", "error");
            return;
        }

        try {
            setIsSubmitting(true);
            const reportData = {
                judul: judul.trim(),
                deskripsi: customReport.trim(),
                created: new Date(),
            };

            await ReportService.createReport(reportData, file);
            notify("Laporan Berhasil Dikirim!", "success");
            setJudul("");
            setCustomReport("");
            setFile(null);
        } catch (error) {
            notify(`Failed to submit report: ${error.message}`, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.form}>
                <h2 className={styles.header}>Buat Laporan</h2>
                <h3 className={styles.field}>Isi Laporannya Dengan Teliti</h3>
                <div className={styles.field}>
                    <label htmlFor="judul" className={styles.label}>
                        Judul Laporan:
                    </label>
                    <input
                        id="judul"
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        className={styles.textarea}
                        placeholder="Masukkan Judul Laporan"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="template" className={styles.label}>
                        Pilih Template:
                    </label>
                    <select
                        id="template"
                        value={template}
                        onChange={handleTemplateChange}
                        className={styles.select}
                    >
                        <option value="">-- Pilih Template --</option>
                        <option value="template1">Template : Laporan Operasional</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="customReport" className={styles.label}>
                        Isi Laporan:
                    </label>
                    <textarea
                        id="customReport"
                        rows="15"
                        value={customReport}
                        onChange={handleCustomReportChange}
                        className={styles.textarea}
                        placeholder="Tulis Isi Laporan Disini..."
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="file" className={styles.label}>
                        Upload Dokumentasi (Optional):
                    </label>
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Kirim Laporan"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ReportForm;
