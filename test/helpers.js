const chai = require("chai");
global.expect = chai.expect;
const jsdom = require("mocha-jsdom");

jsdom({});
