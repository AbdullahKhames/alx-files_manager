#!/usr/bin/node
const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient{
  constructor(){
    this.client = createClient();
    this.client.on('error', (err) => console.log(err.message));
    this.client.promisifiedGet = promisify(this.client.get).bind(this.client);
  }

    isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.client.promisifiedGet(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
