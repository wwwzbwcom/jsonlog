type Log = {
  level?: "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
  msg?: string;
} & Record<string, any>;

export interface LoggerOptions {
  logProcessor?: (log: Log) => any;
}

export class Logger {
  options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = options;
  }
  log(logData: Log) {
    if (this.options.logProcessor) {
      this.options.logProcessor(logData);
    }
  }

  trace(logData: Log) {
    this.log({ ...logData, level: "TRACE" });
  }

  debug(logData: Log) {
    this.log({ ...logData, level: "DEBUG" });
  }

  warn(logData: Log) {
    this.log({ ...logData, level: "WARN" });
  }

  info(logData: Log) {
    this.log({ ...logData, level: "INFO" });
  }

  error(logData: Log) {
    this.log({ ...logData, level: "ERROR" });
  }
}

export function getLogger(name: string = "default", options: LoggerOptions = {}) {
  const g: { jsonlog?: Record<string, Logger> } = (global ?? window) as any;
  if (!g.jsonlog) {
    g.jsonlog = {};
  }

  if (!g.jsonlog[name]) {
    g.jsonlog[name] = new Logger(options);
  }

  return g.jsonlog[name];
}
