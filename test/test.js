import { assert } from "chai";
import lerp from "../src/index";

describe("lerp", function () {
  it("works as documented", ()=>{
    const start = 2;
    const end = 4

    // interp=0
    assert.equal(lerp(start, end, 0), 2);

    // interp=0.5
    assert.equal(lerp(start, end, 0.5), 3);

    // interp=1
    assert.equal(lerp(start, end, 1), 4);
  });

  it("works", ()=>{
    assert.equal(lerp(start, end, 0.5), 3);
    assert.equal(lerp(0, 1, 1), 1);
    assert.equal(lerp(0, 1, 0), 0);
    assert.equal(lerp(0, 1, 0.5), 0.5);
    assert.equal(lerp(1, 2, 0.5), 1.5);
    assert.equal(lerp(-1, -2, 0.5), -1.5);
  });
});
