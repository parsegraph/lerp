# parsegraph-lerp

This module provides a single function called lerp, which linearly interpolates between two
endpoint values using a given interpolation value.

    import lerp from 'parsegraph-lerp';

    const start = 2;
    const end = 4

    // interp=0
    assert.equal(lerp(start, end, 0), 2);

    // interp=0.5
    assert.equal(lerp(start, end, 0.5), 3);

    // interp=1
    assert.equal(lerp(start, end, 1), 4);

