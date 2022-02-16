import { assert } from "chai";
import lerp from "../src/index";

describe("lerp", function () {
  it("works as documented", () => {
    const start = 2;
    const end = 4;

    // interp=0
    assert.equal(lerp(start, end, 0), 2);

    // interp=0.5
    assert.equal(lerp(start, end, 0.5), 3);

    // interp=1
    assert.equal(lerp(start, end, 1), 4);
  });

  it("works for [0,1]", () => {
    assert.equal(lerp(0, 1, 1), 1);
    assert.equal(lerp(0, 1, 0), 0);
    assert.equal(lerp(0, 1, 0.5), 0.5);
  });

  it("works for [1,2]", () => {
    assert.equal(lerp(1, 2, 0.5), 1.5);
  });

  it("works for negatives", () => {
    assert.equal(lerp(-1, -2, 0.5), -1.5);
    assert.equal(lerp(-1, -2, 0), -1);
    assert.equal(lerp(-1, -2, 1), -2);
  });

  it("works for overlapped endpoints like [0, 0]", () => {
    assert.equal(lerp(0, 0, 0.5), 0);
    assert.equal(lerp(0, 0, 0), 0);
    assert.equal(lerp(0, 0, 1), 0);
    assert.equal(lerp(1, 1, 0.5), 1);
    assert.equal(lerp(1, 1, 0), 1);
    assert.equal(lerp(1, 1, 1), 1);
  });

  it("can overload interpolation value", ()=>{
    assert.equal(lerp(0, 1, 2), 2);
    assert.equal(lerp(0, 1, 10), 10);
  });

  it("tolerates NaN by passing it through", ()=>{
    assert.isNaN(lerp(NaN, 1, 2));
    assert.isNaN(lerp(0, NaN, 10));
    assert.isNaN(lerp(0, 0, NaN));
  });
});
