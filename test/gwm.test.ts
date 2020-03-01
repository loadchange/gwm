import { GenerateWatermark } from "../src/gwm";

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy();
  });

  it("DummyClass is instantiable", () => {
    expect(new GenerateWatermark()).toBeInstanceOf(GenerateWatermark);
  });
});
