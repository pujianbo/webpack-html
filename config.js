module.exports = {
  port: 3003,
  IPv4: 'localhost',
  agentSev: 'http://192.168.2.12:9000',
  getAgent: function() {
    return {
      '/apph5/*': {
        target: this.agentSev
      }
    }
  },
  getIP: function() {
    try {
      const network = require('os').networkInterfaces()
      this.IPv4 = network[Object.keys(network)[0]][1].address
      if (this.IPv4.length < 7)
        this.IPv4 = network[Object.keys(network)[1]][1].address
    } catch (e) {
      this.IPv4 = '127.0.0.1';
    } finally {
      const httpStr = 'http://' + this.IPv4 + ':' + this.port;
      const opn = require('opn');
      console.log(httpStr);
      // setTimeout(function() {
      //   opn(httpStr);
      // }, 20000);
      return this.IPv4;
    }
  }
}
