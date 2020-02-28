const body = require('body-parser');
const express = require('express');
const request = require('request');

const servers = ['http://18.191.118.175:3007'];
let cur = 0;

const handler = (req, res) => {
  req.pipe(request({url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
}

const server = express().get('*', handler).post('*', handler);

server.get('/reviews/:id', handler);

server.listen(8080);