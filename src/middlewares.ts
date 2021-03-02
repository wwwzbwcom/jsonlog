import { Log } from ".";

export const printToConsole = (log: Log) => {
  const t = new Date(log.time!).toISOString();
  const lv = log.level?.toLowerCase();
  console[lv as keyof Console](`(${log.name}) ${t} [${log.level}] ${log.msg}`);
};
