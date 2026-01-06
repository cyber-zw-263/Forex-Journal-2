(async () => {
  const res = await fetch('http://172.17.32.1:3000/api/trades', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo-user' },
    body: JSON.stringify({ pair: 'EUR/USD', direction: 'LONG', entryPrice: 1.2, quantity: 1.0, entryTime: new Date().toISOString() })
  });
  console.log('status', res.status);
  const body = await res.text();
  console.log(body);
})();