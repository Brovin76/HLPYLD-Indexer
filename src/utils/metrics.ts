export class MetricsCollector {
  private metrics: Map<string, number> = new Map();
  private startTimes: Map<string, number> = new Map();

  startTimer(name: string) {
    this.startTimes.set(name, Date.now());
  }

  endTimer(name: string) {
    const start = this.startTimes.get(name);
    if (start) {
      const duration = Date.now() - start;
      this.increment(`${name}_duration`, duration);
      this.startTimes.delete(name);
    }
  }

  increment(name: string, value = 1) {
    const current = this.metrics.get(name) || 0;
    this.metrics.set(name, current + value);
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  reset() {
    this.metrics.clear();
    this.startTimes.clear();
  }
} 