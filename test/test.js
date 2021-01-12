var assert = require("assert");
import lerp from "../dist/lerp";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(lerp(0, 1, 1), 1);
    assert.equal(lerp(0, 1, 0), 0);
    assert.equal(lerp(0, 1, 0.5), 0.5);
    assert.equal(lerp(1, 2, 0.5), 1.5);
    assert.equal(lerp(-1, -2, 0.5), -1.5);
  });
});
