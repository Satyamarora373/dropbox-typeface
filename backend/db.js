const mysql = require('mysql2/promise');

// MySQL configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',   // Replace with your MySQL password
  database: 'dropbox_clone'
};

// Create database connection pool
const pool = mysql.createPool(dbConfig);

// Function to create the table if it doesn't exist
const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      path VARCHAR(500) NOT NULL,
      size BIGINT NOT NULL,
      type VARCHAR(100) NOT NULL,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    console.log('✅ Table "files" is ready');
    connection.release();
  } catch (error) {
    console.error('❌ Error creating table:', error);
  }
};

// Initialize the table when the app starts
createTable();

module.exports = pool;
