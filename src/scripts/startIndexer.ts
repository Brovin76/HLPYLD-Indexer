import { HypurrYieldIndexer } from '../indexer/HypurrYieldIndexer.js';
import { INDEXER_CONFIG } from '../indexer/config.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  console.log('Starting indexer with config:', {
    rpcUrl: INDEXER_CONFIG.rpcUrl,
    vaultAddresses: INDEXER_CONFIG.vaultAddresses
  });

  const indexer = new HypurrYieldIndexer();
  
  try {
    console.log('Initializing indexer...');
    await indexer.initialize();
    
    console.log('Starting market data subscription...');
    await indexer.startMarketDataSubscription();
    
    // Process new blocks every 15 seconds
    setInterval(async () => {
      try {
        await indexer.processNewBlocks();
      } catch (error) {
        console.error('Error processing blocks:', error);
      }
    }, INDEXER_CONFIG.refreshInterval);
    
    console.log('Indexer started successfully');

    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('Shutting down indexer...');
      await indexer.cleanup();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start indexer:', error);
    await indexer.cleanup();
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 