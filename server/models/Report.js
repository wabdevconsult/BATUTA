import db from '../config/db.js';

class Report {
  static create(reportData) {
    const { userId, type, data } = reportData;
    const stmt = db.prepare(`
      INSERT INTO reports (userId, type, data)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(userId, type, JSON.stringify(data));
    return { id: result.lastInsertRowid, ...reportData };
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM reports WHERE id = ?');
    const report = stmt.get(id);
    if (report && report.data) {
      report.data = JSON.parse(report.data);
    }
    return report;
  }

  static findByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM reports WHERE userId = ?');
    const reports = stmt.all(userId);
    return reports.map(report => ({
      ...report,
      data: report.data ? JSON.parse(report.data) : {}
    }));
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM reports');
    const reports = stmt.all();
    return reports.map(report => ({
      ...report,
      data: report.data ? JSON.parse(report.data) : {}
    }));
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM reports WHERE id = ?');
    return stmt.run(id);
  }
}

export default Report;