var assert = require("assert");
import todo from "../dist/lerp";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
