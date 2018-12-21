ES8 es8;
es8.loadConfig();
es8.calibratePitch(69, 5.0);

Step s => dac.chan(0);

1 => int inc;

while (true) {
    /* es8.freq(0, 110.0) => float amplitude; */
    es8.pitch(0, Math.random2(40, 70)) => float amplitude;
    s.next(amplitude);

    0.1::second => now;
    (inc + 1) % 500 => inc;
}

hour => now;
