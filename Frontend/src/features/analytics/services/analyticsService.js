// Analytics Service for 4-layer architecture
export const analyticsService = {
  getAnalyticsData: async () => {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      metrics: {
        uptime: 99.98,
        avgLatency: 124,
        failureRate: 0.02,
        totalIncidents: 12
      },
      latencyHistory: [
        { time: '00:00', value: 110 },
        { time: '04:00', value: 130 },
        { time: '08:00', value: 150 },
        { time: '12:00', value: 120 },
        { time: '16:00', value: 140 },
        { time: '20:00', value: 115 },
        { time: '23:59', value: 125 },
      ],
      uptimeHistory: [
        { day: 'Mon', status: 'UP', percentage: 100 },
        { day: 'Tue', status: 'UP', percentage: 100 },
        { day: 'Wed', status: 'DOWN', percentage: 95 },
        { day: 'Thu', status: 'UP', percentage: 100 },
        { day: 'Fri', status: 'UP', percentage: 100 },
        { day: 'Sat', status: 'UP', percentage: 100 },
        { day: 'Sun', status: 'UP', percentage: 100 },
      ],
      aiInsights: {
        summary: "System stability is high, but we noticed a recurring latency spike every Wednesday at 08:00 UTC. This correlates with your scheduled database backup tasks.",
        recommendation: "Consider moving the database backup to a lower-traffic window (e.g., Sunday 02:00 UTC) to maintain optimal response times.",
        confidence: 94
      }
    };
  }
};
