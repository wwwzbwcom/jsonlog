import { getLogger } from "../src/index";

describe("Console Test", () => {
  test("Info", () => {
    const consoleLogSpy = jest.spyOn(global.console, "info");
    const log = getLogger("default", {
      logProcessor: (log) => {
        const t = new Date();
        const lv = log.level.toLowerCase();
        console[lv](`${t.toISOString()} [${log.level}] ${log.msg}`);
      },
    });
    log.info({ msg: "Hello World" });

    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(`[INFO] ${"Hello World"}`)
    );
  });
});
