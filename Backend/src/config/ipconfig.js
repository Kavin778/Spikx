import { networkInterfaces } from "os";

export function LocalIpAddress() {
  const nets = networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  const firstInterface = Object.keys(results)[0];
  console.log(firstInterface[0]);
  return firstInterface ? results[firstInterface][0] : null;
}
