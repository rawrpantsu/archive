const { disallow, iff, isProvider } = require("feathers-hooks-common");
const redisCache = require("../cache");

module.exports = {
  before: {
    all: [],
    find: [iff(isProvider("external"), redisCache.before())],
    get: [iff(isProvider("external"), redisCache.before())],
    create: [disallow("external")],
    update: [disallow("external")],
    patch: [disallow("external")],
    remove: [disallow("external")],
  },

  after: {
    all: [],
    find: [
      iff(isProvider("external"), redisCache.after({ expiration: 3600 * 24 })),
    ],
    get: [
      iff(isProvider("external"), redisCache.after({ expiration: 3600 * 24 })),
    ],
    create: [redisCache.purge()],
    update: [redisCache.purge()],
    patch: [redisCache.purge()],
    remove: [redisCache.purge()],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
