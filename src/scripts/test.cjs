const { Pool } = require('pg');

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  try {
    // Test a simple query
    const result = await pool.query('SELECT * FROM "VaultMetrics" LIMIT 1');
    console.log('Database connection successful');
    console.log('Test query result:', result.rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection().catch(console.error); 