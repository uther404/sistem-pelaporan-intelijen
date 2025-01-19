import Backendless from './backendless';

const TABLE_NAME = 'Laporan';
const UPLOAD_DIRECTORY = 'dokumentasi/';
const ReportService = {

  uploadImage: async (file) => {
    try {
      if (!file) {
        throw new Error('File is required for upload.');
      }

      const fileName = `${Date.now()}_${file.name}`;
      const result = await Backendless.Files.upload(file, UPLOAD_DIRECTORY, true);
      return result.fileURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error.message || 'Failed to upload file.');
    }
  },

  createReport: async (report, file) => {
    try {
      if (!report || !report.judul || !report.deskripsi) {
        throw new Error('Report must have a title (judul) and content (deskripsi).');
      }

      let dokumentasiUrl = null;
      if (file) {
        dokumentasiUrl = await ReportService.uploadImage(file);
      }

      const savedReport = await Backendless.Data.of(TABLE_NAME).save({
        ...report,
        dokumentasi: dokumentasiUrl,
        status: report.status || 'Pending',
      });

      return savedReport;
    } catch (error) {
      console.error('Error creating report:', error);
      throw new Error(error.message || 'Failed to create report.');
    }
  },

  getReports: async () => {
    try {
      const queryBuilder = Backendless.DataQueryBuilder.create()
        .setSortBy(['created DESC']);
      const reports = await Backendless.Data.of(TABLE_NAME).find(queryBuilder);
      return reports;
    } catch (error) {
      console.error('Error retrieving reports:', error);
      throw new Error(error.message || 'Failed to retrieve reports.');
    }
  },

  getReportDetails: async (id) => {
    try {
      if (!id) {
        throw new Error('Report ID is required.');
      }
      const report = await Backendless.Data.of(TABLE_NAME).findById(id);
      return report;
    } catch (error) {
      console.error('Error retrieving report details:', error);
      throw new Error(error.message || 'Failed to retrieve report details.');
    }
  },

  updateReport: async (reportId, updates, file) => {
    try {
      if (!reportId) {
        throw new Error('Report ID is required to update a report.');
      }
      if (!updates || Object.keys(updates).length === 0) {
        throw new Error('Updates cannot be empty.');
      }

      let dokumentasiUrl = updates.dokumentasi || null;
      if (file) {
        dokumentasiUrl = await ReportService.uploadImage(file);
      }

      const updatedReport = await Backendless.Data.of(TABLE_NAME).save({
        objectId: reportId,
        ...updates,
        dokumentasi: dokumentasiUrl,
      });

      return updatedReport;
    } catch (error) {
      console.error('Error updating report:', error);
      throw new Error(error.message || 'Failed to update report.');
    }
  },

  deleteReport: async (reportId) => {
    try {
      if (!reportId) {
        throw new Error('Report ID is required to delete a report.');
      }
      await Backendless.Data.of(TABLE_NAME).remove({ objectId: reportId });
      return `Report with ID ${reportId} has been deleted.`;
    } catch (error) {
      console.error('Error deleting report:', error);
      throw new Error(error.message || 'Failed to delete report.');
    }
  },

  searchReports: async (keyword) => {
    try {
      if (!keyword) {
        throw new Error('Keyword is required for searching reports.');
      }
      const queryBuilder = Backendless.DataQueryBuilder.create()
        .setWhereClause(`judul LIKE '%${keyword}%' OR deskripsi LIKE '%${keyword}%'`)
        .setSortBy(['created DESC']);
      const results = await Backendless.Data.of(TABLE_NAME).find(queryBuilder);
      return results;
    } catch (error) {
      console.error('Error searching reports:', error);
      throw new Error(error.message || 'Failed to search reports.');
    }
  },

  getReportSummaryByStatus: async () => {
    try {
      const reports = await Backendless.Data.of(TABLE_NAME).find();
      const statusCount = reports.reduce((acc, report) => {
        const status = report.status || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      return statusCount;
    } catch (error) {
      console.error('Error summarizing reports by status:', error);
      throw new Error(error.message || 'Failed to summarize reports by status.');
    }
  },

  uploadFile: async (formData) => {
    try {
        const response = await Backendless.Files.upload(formData, "dokumentasi/");
        return response.fileURL; // URL file yang diunggah
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file.");
    }
},
};

export default ReportService;
