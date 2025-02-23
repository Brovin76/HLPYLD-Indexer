import pkg from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pkg;

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  
  console.log('Connecting to:', connectionString.replace(/:[^:@]*@/, ':***@'));
  
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
      requestCert: true
    }
  });
  
  try {
    // Insert test data
    console.log('\nInserting test data...');

    // VaultMetrics test data
    await pool.query(`
      INSERT INTO "VaultMetrics" (
        "vaultAddress", "totalAssets", "totalSupply", "performanceFee", "apr"
      ) VALUES (
        '0x5dFB5c9DA01b0353bcF433Ce64D1E291D4B616a6',
        1000000000000000000,
        900000000000000000,
        0.1,
        5.2
      );
    `);

    // LPMovement test data
    await pool.query(`
      INSERT INTO "LPMovement" (
        "from", "to", "amount", "timestamp", "transactionHash"
      ) VALUES (
        '0x0000000000000000000000000000000000000000',
        '0x5dFB5c9DA01b0353bcF433Ce64D1E291D4B616a6',
        100000000000000000,
        NOW(),
        '0x123abc456def789'
      );
    `);

    // YieldMetric test data
    await pool.query(`
      INSERT INTO "YieldMetric" (
        "vaultAddress", "timestamp", "apr", "tvl", "harvestAmount"
      ) VALUES (
        '0x5dFB5c9DA01b0353bcF433Ce64D1E291D4B616a6',
        NOW(),
        5.2,
        1000000000000000000,
        50000000000000000
      );
    `);

    console.log('Test data inserted successfully');

    // Query and display test data
    console.log('\nQuerying test data:');

    const vaultMetrics = await pool.query('SELECT * FROM "VaultMetrics" LIMIT 1');
    console.log('\nVault Metrics:', vaultMetrics.rows[0]);

    const lpMovements = await pool.query('SELECT * FROM "LPMovement" LIMIT 1');
    console.log('\nLP Movements:', lpMovements.rows[0]);

    const yieldMetrics = await pool.query('SELECT * FROM "YieldMetric" LIMIT 1');
    console.log('\nYield Metrics:', yieldMetrics.rows[0]);

  } catch (error) {
    console.error('Database operation failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection().catch(console.error);