import db from '../config/db.js';

class Intervention {
  static create(interventionData) {
    const { clientId, userId, title, description, status = 'scheduled', scheduledDate } = interventionData;
    const stmt = db.prepare(`
      INSERT INTO interventions (clientId, userId, title, description, status, scheduledDate)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(clientId, userId, title, description, status, scheduledDate);
    return { id: result.lastInsertRowid, ...interventionData };
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM interventions WHERE id = ?');
    return stmt.get(id);
  }

  static findByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM interventions WHERE userId = ?');
    return stmt.all(userId);
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM interventions');
    return stmt.all();
  }

  static update(id, interventionData) {
    const fields = Object.keys(interventionData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(interventionData);
    const stmt = db.prepare(`UPDATE interventions SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`);
    stmt.run(...values, id);
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM interventions WHERE id = ?');
    return stmt.run(id);
  }
}

export default Intervention;