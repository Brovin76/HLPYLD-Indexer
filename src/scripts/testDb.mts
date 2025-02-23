import { DatabaseService } from '../indexer/database.mjs';
import { TESTNET_CONTRACT_ADDRESSES } from '../config/constants.js';

async function testConnection() {
  const db = new DatabaseService();
  try {
    // Test query
    const result = await db.getLatestVaultMetrics(TESTNET_CONTRACT_ADDRESSES.VAULT);
    console.log('Database connection successful');
    console.log('Test query result:', result);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await db.disconnect();
  }
}

testConnection(); 