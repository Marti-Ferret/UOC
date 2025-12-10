import {
  summarizeCartItems,
  fetchUserRecommendations,
  authorizeOrderPayment,
  buildCustomerOnboarding,
  loadPerformanceReport,
  createInventoryScheduler
} from './pec3';

const flushAsync = () => new Promise((resolve) => process.nextTick(resolve));

describe('Exercise 1 — summarizeCartItems', () => {
  test('aggregates totals and returns callback result', () => {
    const cart = [
      { id: 401, price: 35.5, quantity: 2 },
      { id: 208, price: 12, quantity: 1 }
    ];

    const callback = jest.fn(() => 'done');

    const result = summarizeCartItems(cart, callback);

    expect(callback).toHaveBeenCalledWith(null, {
      totalItems: 3,
      totalPrice: 83,
      itemIds: [208, 401]
    });
    expect(result).toBe('done');
  });

  test('reports validation error through callback', () => {
    const callback = jest.fn();

    summarizeCartItems('not-an-array', callback);

    expect(callback).toHaveBeenCalledWith(expect.any(String), null);
  });

  test.each([
    ['empty array', []],
    ['item is null', [null]],
    ['missing id', [{ price: 10, quantity: 1 }]],
    ['id not a number', [{ id: '401', price: 10, quantity: 1 }]],
    ['price not a number', [{ id: 401, price: '10', quantity: 1 }]],
    ['price zero', [{ id: 401, price: 0, quantity: 1 }]],
    ['price negative', [{ id: 401, price: -5, quantity: 1 }]],
    ['quantity not a number', [{ id: 401, price: 10, quantity: '1' }]],
    ['quantity zero', [{ id: 401, price: 10, quantity: 0 }]],
    ['quantity negative', [{ id: 401, price: 10, quantity: -2 }]]
  ])('validates item structure and values — %s', (_label, cart) => {
    const callback = jest.fn();

    summarizeCartItems(cart, callback);

    expect(callback).toHaveBeenCalledWith(expect.any(String), null);
  });
});

describe('Exercise 2 — fetchUserRecommendations', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  test('resolves with payload and triggers callback', async () => {
    const callback = jest.fn();

    const promise = fetchUserRecommendations(5, callback);

    await new Promise((resolve) => setTimeout(resolve, 220));

    const payload = await promise;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeNull();
    expect(callback.mock.calls[0][1]).toMatchObject({ userId: 5 });
    expect(Array.isArray(payload.recommendations)).toBe(true);
    expect(payload.recommendations).toHaveLength(3);
  });

  test('rejects immediately when userId is invalid and calls callback with error', async () => {
    const callback = jest.fn();

    await expect(fetchUserRecommendations(-1, callback)).rejects.toThrow('Invalid user id');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(callback.mock.calls[0][0].message).toBe('Invalid user id');
    expect(callback.mock.calls[0][1]).toBeNull();
  });
});

describe('Exercise 3 — authorizeOrderPayment', () => {
  test('resolves when amount is within allowed range', async () => {
    await expect(authorizeOrderPayment(1200)).resolves.toEqual({ status: 'approved', amount: 1200 });
  });

  test('rejects when amount exceeds limit', async () => {
    await expect(authorizeOrderPayment(3000)).rejects.toThrow('Order total too high');
  });

  test('rejects when amount is invalid', async () => {
    await expect(authorizeOrderPayment('250')).rejects.toThrow('Invalid order amount');
    await expect(authorizeOrderPayment(0)).rejects.toThrow('Invalid order amount');
  });
});

describe('Exercise 4 — buildCustomerOnboarding', () => {
  test('chains promises and returns welcome pack data', async () => {
    const fetchCustomerProfile = jest.fn().mockResolvedValue({ id: 12, name: 'Alex' });
    const fetchSubscription = jest.fn().mockResolvedValue({ plan: 'pro', userId: 12 });
    const fetchWelcomePack = jest.fn().mockResolvedValue({ welcomeEmailSent: true });

    const result = await buildCustomerOnboarding(
      fetchCustomerProfile,
      fetchSubscription,
      fetchWelcomePack
    );

    expect(fetchCustomerProfile).toHaveBeenCalled();
    expect(fetchSubscription).toHaveBeenCalledWith(12);
    expect(fetchWelcomePack).toHaveBeenCalledWith({
      customer: { id: 12, name: 'Alex' },
      subscription: { plan: 'pro', userId: 12 }
    });
    expect(result).toEqual({ welcomeEmailSent: true });
  });

  test('wraps errors with onboarding context', async () => {
    const fetchCustomerProfile = jest.fn().mockResolvedValue({ id: 5 });
    const fetchSubscription = jest.fn().mockRejectedValue(new Error('Service unavailable'));
    const fetchWelcomePack = jest.fn();

    await expect(
      buildCustomerOnboarding(fetchCustomerProfile, fetchSubscription, fetchWelcomePack)
    ).rejects.toThrow('Onboarding failed: Service unavailable');
  });
});

describe('Exercise 5 — loadPerformanceReport', () => {
  test('returns aggregated report data', async () => {
    const fetchMetrics = jest
      .fn()
      .mockResolvedValue({ warehouse: 'central-hub', stats: [31, 12, 5, 10, 1, 28] });
    const processMetrics = jest
      .fn()
      .mockResolvedValue({ average: 14.5 });

    const report = await loadPerformanceReport(fetchMetrics, processMetrics);
    expect(fetchMetrics).toHaveBeenCalled();
    expect(processMetrics).toHaveBeenCalledWith([31, 12, 5, 10, 1, 28]);
    expect(report).toEqual({
      warehouse: 'central-hub',
      stats: [31, 12, 5, 10, 1, 28],
      average: 14.5
    });
  });

  test('throws wrapped error when a dependency fails', async () => {
    const fetchMetrics = jest.fn().mockRejectedValue(new Error('Metrics API offline'));
    const processMetrics = jest.fn();

    await expect(loadPerformanceReport(fetchMetrics, processMetrics)).rejects.toThrow(
      'Failed to load performance report: Metrics API offline'
    );
  });
});

describe('Exercise 6 — createInventoryScheduler', () => {
  test('invokes fetchNextRestock according to the configured interval', async () => {
    const fetchNextRestock = jest.fn().mockResolvedValue([]);
    const applyRestock = jest.fn();

    let capturedIntervalFn;
    const setIntervalSpy = jest.spyOn(global, 'setInterval').mockImplementation((fn, delay) => {
      capturedIntervalFn = fn;
      return 123;
    });
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval').mockImplementation(() => {});

    const scheduler = createInventoryScheduler(fetchNextRestock, applyRestock, 50);

    scheduler.start();

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 50);

    expect(typeof capturedIntervalFn).toBe('function');

    await flushAsync();
    expect(fetchNextRestock).toHaveBeenCalledTimes(1);

    await capturedIntervalFn();
    await flushAsync();
    expect(fetchNextRestock).toHaveBeenCalledTimes(2);

    await capturedIntervalFn();
    await flushAsync();
    expect(fetchNextRestock).toHaveBeenCalledTimes(3);

    scheduler.stop();
    expect(clearIntervalSpy).toHaveBeenCalled();

    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  test('stops automatically when fetchNextRestock returns null', async () => {
    const fetchNextRestock = jest.fn().mockResolvedValueOnce(null);
    const applyRestock = jest.fn();

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval').mockImplementation(() => {});

    const scheduler = createInventoryScheduler(fetchNextRestock, applyRestock, 40);

    scheduler.start();

    await flushAsync();

    expect(fetchNextRestock).toHaveBeenCalledTimes(1);
    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(applyRestock).not.toHaveBeenCalled();
    expect(scheduler.getStatus()).toEqual([]);

    scheduler.stop();

    clearIntervalSpy.mockRestore();
  });

  test('processes restock batches and tracks status', async () => {
    const fetchNextRestock = jest
      .fn()
      .mockResolvedValueOnce([
        { sku: 'A-42', quantity: 10 },
        { sku: 'B-11', quantity: 4 }
      ])
      .mockResolvedValueOnce(null);

    const applyRestock = jest
      .fn()
      .mockResolvedValueOnce({ sku: 'A-42', stock: 10 })
      .mockRejectedValueOnce(new Error('Warehouse offline'));

    const scheduler = createInventoryScheduler(fetchNextRestock, applyRestock, 20);

    scheduler.start();

    await new Promise((resolve) => setTimeout(resolve, 60));
    await flushAsync();

    const status = scheduler.getStatus();

    expect(fetchNextRestock).toHaveBeenCalledTimes(2);
    expect(applyRestock).toHaveBeenCalledTimes(2);
    expect(status).toHaveLength(2);
    expect(status[0]).toMatchObject({
      sku: 'A-42',
      status: 'completed',
      result: { sku: 'A-42', stock: 10 },
      error: null
    });
    expect(status[1]).toMatchObject({
      sku: 'B-11',
      status: 'failed',
      result: null,
      error: 'Warehouse offline'
    });

    scheduler.stop();
  });

  test('stop prevents additional iterations', async () => {
    const fetchNextRestock = jest.fn().mockResolvedValue([{ sku: 'C-10', quantity: 2 }]);
    const applyRestock = jest.fn().mockResolvedValue({ sku: 'C-10', stock: 2 });

    const scheduler = createInventoryScheduler(fetchNextRestock, applyRestock, 30);

    scheduler.start();

    await new Promise((resolve) => setTimeout(resolve, 35));
    await flushAsync();

    scheduler.stop();
    const callsBeforeStop = fetchNextRestock.mock.calls.length;

    await new Promise((resolve) => setTimeout(resolve, 60));
    await flushAsync();

    expect(fetchNextRestock.mock.calls.length).toBe(callsBeforeStop);
  });
});
