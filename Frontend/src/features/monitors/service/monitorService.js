export const monitorService = {
  getMonitors: async () => {
    // Mocking API call
    return [
      {
        id: '1',
        name: 'Marketing Site',
        url: 'https://acme.com',
        status: 'Operational',
        response: '142ms',
        uptime: '99.98%',
        interval: '1m',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '2',
        name: 'API Gateway',
        url: 'https://api.acme.com/v1/health',
        status: 'Operational',
        response: '89ms',
        uptime: '99.99%',
        interval: '30s',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '3',
        name: 'Checkout Service',
        url: 'https://pay.acme.com',
        status: 'Down',
        response: '-',
        uptime: '97.42%',
        interval: '1m',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '4',
        name: 'Auth Service',
        url: 'https://auth.acme.com',
        status: 'Operational',
        response: '211ms',
        uptime: '99.91%',
        interval: '1m',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '5',
        name: 'Docs',
        url: 'https://docs.acme.com',
        status: 'Degraded',
        response: '824ms',
        uptime: '99.72%',
        interval: '5m',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '6',
        name: 'Status Page',
        url: 'https://status.acme.com',
        status: 'Operational',
        response: '67ms',
        uptime: '100%',
        interval: '30s',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      },
      {
        id: '7',
        name: 'Webhook Receiver',
        url: 'https://hooks.acme.com',
        status: 'Operational',
        response: '45ms',
        uptime: '99.95%',
        interval: '1m',
        history: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100))
      }
    ];
  }
};
