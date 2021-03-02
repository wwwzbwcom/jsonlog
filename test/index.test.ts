import { printToConsole } from '../src/middlewares';
import { getLogger } from "../src/index";

describe("Console Test", () => {
  test("Info", () => {
    const consoleLogSpy = jest.spyOn(global.console, "info");
    const log = getLogger({
      name: 'default',
      middlewares: [printToConsole],
    });
    log.info({ msg: "Hello World" });

    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(`[INFO] ${"Hello World"}`)
    );
  });
});
