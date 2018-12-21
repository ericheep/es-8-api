ES8 es8;

es8.loadConfig();
es8.getAmplitude(6, 9.0) => float amplitude;

Step s => dac.chan(6);
s.next(amplitude);

hour => now;
