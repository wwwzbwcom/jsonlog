export * from './middlewares';

export type Log = {
  level?: "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";
  msg?: string;
  time?: string | Date;
  name?: string;
} & Record<string, any>;

export interface LoggerOptions {
  name?: string;
  middlewares?: ((log: Log) => any)[];
}

export class Logger {
  options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      name: options.name ?? "default",
      middlewares: options.middlewares,
    };
  }

  private _log(logData: Log) {
    if (this.options.middlewares) {
      for (const m of this.options.middlewares) {
        m({
          ...this.generateData(),
          ...logData,
        });
      }
    }
  }

  generateData() {
    return {
      time: new Date(),
      name: this.options.name,
    };
  }

  trace(logData: Log) {
    this._log({ ...logData, level: "TRACE" });
  }

  debug(logData: Log) {
    this._log({ ...logData, level: "DEBUG" });
  }

  warn(logData: Log) {
    this._log({ ...logData, level: "WARN" });
  }

  info(logData: Log) {
    this._log({ ...logData, level: "INFO" });
  }

  error(logData: Log) {
    this._log({ ...logData, level: "ERROR" });
  }
}

export function getLogger(options: LoggerOptions = {}) {
  const name = options.name ?? "default";
  const g: { jsonlog?: Record<string, Logger> } = (global ?? window) as any;
  if (!g.jsonlog) {
    g.jsonlog = {};
  }

  if (!g.jsonlog[name]) {
    g.jsonlog[name] = new Logger(options);
  }

  return g.jsonlog[name];
}
