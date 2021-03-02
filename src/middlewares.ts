import { Log } from ".";

export const printToConsole = (log: Log) => {
  const lv = log.level?.toLowerCase();
  if (log.time instanceof Date) {
    log.time = log.time?.toLocaleString("sv", { hour12: false });
  }
  console[lv as keyof Console](
    `${log.time} (${log.name}) [${log.level}] ${log.msg}`
  );
};
