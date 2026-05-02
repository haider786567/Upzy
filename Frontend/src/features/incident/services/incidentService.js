const incidentService = {
  getIncidents: async () => {
    // In a real app, this would fetch from the API
    return [
      {
        id: '1',
        service: 'Checkout Service',
        url: 'https://pay.upzy.io',
        status: 'failure',
        time: 'Today, 14:22',
        duration: '12m',
        ongoing: true,
        aiAnalysis: {
          summary: 'The checkout endpoint is returning 503 errors consistently. Root cause appears correlated with a recent deploy (build #4821) — database connection pool is exhausted under load.',
          recommendation: 'Roll back to build #4819 and increase pool size to 50.'
        },
        logs: [
          { time: '14:27:04', method: 'GET', path: '/healthz', status: 503, message: 'Service Unavailable' },
          { time: '14:22:34', method: 'GET', path: '/healthz', status: 503, message: 'Service Unavailable (timeout 5s)' },
          { time: '14:21:01', method: 'TCP', path: 'connect', status: 'refused', message: 'on :443' },
          { time: '14:20:30', method: 'GET', path: '/healthz', status: 503, message: 'Service Unavailable' },
        ]
      },
      {
        id: '2',
        service: 'Docs',
        url: 'https://docs.upzy.io',
        status: 'degraded',
        time: 'Today, 11:08',
        duration: '18m',
        ongoing: false
      },
      {
        id: '3',
        service: 'Auth Service',
        url: 'https://auth.upzy.io',
        status: 'recovered',
        time: 'Yesterday, 22:41',
        duration: '4m',
        ongoing: false
      }
    ];
  }
};

export default incidentService;
