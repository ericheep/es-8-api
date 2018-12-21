ES8 es8;
es8.loadConfig();

Step s => dac.chan(0);

1 => int inc;

while (true) {
    es8.getAmplitude(0, 5.0) => float amplitude;
    s.next(amplitude);

    0.1::second => now;

    (inc + 1) % 500 => inc;
}


hour => now;
