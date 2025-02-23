import { formatDistanceToNow, isFuture, isPast, format } from 'date-fns'

export function getTimeLeft(endDate?: Date): string {
  if (!endDate) return 'N/A';
  
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff < 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return `${days}d ${hours}h left`;
}

// Format currency with more granularity
export function formatLiquidity(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toLocaleString()}`;
} 