# HLPYLD-Indexer

Hyperliquid Yield Vault Indexer - Tracks and analyzes vault performance metrics.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   ```
   cp .env.example .env
   # Edit .env with your database credentials and RPC URL
   ```

3. Run database migrations:
   ```
   npx prisma migrate dev
   ```

4. Start the indexer:
   ```
   npm run start:indexer
   ```

## Features

- Real-time vault metrics tracking
- Performance analytics and risk monitoring
- Market data integration from Hyperliquid
- Health checks and alerts
- Cost analysis and gas optimization

## Data Models

### Vault Metrics
- Total Value Locked (TVL)
- Performance metrics
- APR/APY calculations

### User Positions
- LP token movements
- Position tracking
- PnL calculations

### Trading Performance
- Win rate and profit factor
- Sharpe ratio
- Maximum drawdown

### Market Data
- Price feeds
- Volume metrics
- Funding rates
- Liquidation data

### Risk Analytics
- Leverage ratios
- Exposure analysis
- Value at Risk (VaR)
- Stress test results

## API Endpoints

- `/health` - Service health status
- `/metrics` - Performance metrics
- `/vaults` - Vault information
- `/positions` - Position tracking
- `/analytics` - Trading analytics

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)