/**
 * Exercise 1: Basic callback usage
 * Validates cart items and aggregates totals using a Node-style callback.
 * @param {Array} cartItems
 * @param {Function} callback
 * @returns {*}
 */
function summarizeCartItems(cartItems, callback) {

  if (cartItems === null || cartItems.length === 0) {
    return callback("La llista d'elements no pot estar buida.", null);
  }

  for (const item of cartItems) {
    if (!item) {
      return callback("Els elements han de ser objectes vàlids.", null);
    }
    if (typeof item.id !== "number") {
      return callback("id ha de ser un número.", null);
    }
    if (typeof item.price !== "number" || item.price <= 0) {
      return callback("price ha de ser un número positiu.", null);
    }
    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return callback("quantity ha de ser un número positiu.", null);
    }
  }

  let totalItems = 0;
  let totalPrice = 0;
  let itemIds = [];

  for (const { id, price, quantity } of cartItems) {
    totalItems += quantity;
    totalPrice += price * quantity;
    itemIds.push(id);
  }

  itemIds.sort((a, b) => a - b);

  const summary = { totalItems, totalPrice, itemIds };

  return callback(null, summary);
}

/**
 * Exercise 2: Promise that executes a callback
 * Simulates fetching personalised recommendations while notifying a callback.
 * @param {number} userId
 * @param {Function} callback
 * @returns {Promise<object>}
 */
function fetchUserRecommendations(userId, callback) {
  if (userId <= 0) {
    const error = new Error("Invalid user id");
    callback(error, null);
    return Promise.reject(error);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const payload = {
        userId,
        recommendations: [
          'Top pick for user 99',
          'Trending in your area',
          'Customers too enjoyed'
        ]
      };

      callback(null, payload);

      resolve(payload);
    }, 200);
  });
}

/**
 * Exercise 3: Promise with resolve/reject logic
 * Authorises a payment amount with simple business rules.
 * @param {number} amount
 * @returns {Promise<object>}
 */
function authorizeOrderPayment(amount) {
  return new Promise((resolve, reject) => {
    if (amount > 2500) {
      const error = new Error("Order total too high");
      return reject(error);
    }
    if (typeof amount !== "number" || amount <= 0) {
      const error = new Error("Invalid order amount");
      return reject(error);
    }
    return resolve({ status: "approved", amount});
  });
}

/**
 * Exercise 4: Chaining different promises
 * Builds an onboarding payload by chaining multiple asynchronous sources.
 * @param {Function} fetchCustomerProfile
 * @param {Function} fetchSubscription
 * @param {Function} fetchWelcomePack
 * @returns {Promise<object>}
 */
function buildCustomerOnboarding(fetchCustomerProfile, fetchSubscription, fetchWelcomePack) {
  let customerData = null; 

  return fetchCustomerProfile()
    .then((customer) => {
      customerData = customer;
      return fetchSubscription(customer.id);
    })
    .then((subscription) => {
      const object = {
        customer: customerData,
        subscription: subscription,
      };
      return fetchWelcomePack(object);
    })
    .catch((error) => {
      throw new Error("Onboarding failed: " + error.message);
    });
}

/**
 * Exercise 5: Async/await workflow
 * Loads e-commerce fulfillment performance data using async/await syntax.
 * @param {Function} fetchMetrics
 * @param {Function} processMetrics
 * @returns {Promise<object>}
 */
async function loadPerformanceReport(fetchMetrics, processMetrics) {
  try {
    const { warehouse, stats } = await fetchMetrics();
    const { average } = await processMetrics(stats);

    return {
      warehouse,
      stats,
      average
    };
  } catch (error) {
    throw new Error("Failed to load performance report: " + error.message);
  }
}

/**
 * Exercise 6: Background process management
 * Creates an inventory scheduler that processes restock batches in the background.
 * @param {Function} fetchNextRestock
 * @param {Function} applyRestock
 * @param {number} [intervalMs=250]
 * @returns {{ start: Function, stop: Function, getStatus: Function }}
 */
function createInventoryScheduler(fetchNextRestock, applyRestock, intervalMs = 250) {
  let running = false;
  let intervalId = null;
  const statusLog = [];

  async function loop() {
    if (!running) return;

    const batch = await fetchNextRestock();

    if (batch === null) {
      stop();
      return;
    }

    const updates = [];

    if (Array.isArray(batch)) {
      for (let i = 0; i < batch.length; i++) {
        updates.push(batch[i]);
      }
    } else {
      updates.push(batch);
    }

    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      const sku = update && update.sku;

      try {
        const result = await applyRestock(update);
        statusLog.push({ sku, status: "completed", result, error: null });
      } catch (err) {
        const errorMessage = err.message;
        statusLog.push({ sku, status: "failed", result: null, error: errorMessage });
      }
    }
  }

  function start() {
    if (running) return;
    running = true;

    loop();

    intervalId = setInterval(loop, intervalMs);
  }

  function stop() {
    if (!running) return;
    running = false;

    clearInterval(intervalId);
    intervalId = null;
  }

  function getStatus() {
    return statusLog;
  }

  return { start, stop, getStatus };

}

export {
  summarizeCartItems,
  fetchUserRecommendations,
  authorizeOrderPayment,
  buildCustomerOnboarding,
  loadPerformanceReport,
  createInventoryScheduler
};
