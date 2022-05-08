export const debugProcess = () => {
  console.log(process.cpuUsage().system);
  console.log(process.cpuUsage().user);
  console.log(process.cwd());
  console.log(process.getuid());
  console.log(process.hrtime());
  console.log(process.pid);
  console.log(process.platform);
  console.log(process.memoryUsage());
  console.log(process.resourceUsage());
  console.log(process.title);
  console.log(process.uptime());
  console.log(process.version);
  console.log(process.versions);
};
