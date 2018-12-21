public class ES8 {
    8     => int NUM_OUTPUT_CHANNELS;
    440.0 => float anchorFrequency;
    5.0   => float anchorVoltage;

    float voltageMaxs[NUM_OUTPUT_CHANNELS];
    float voltageMins[NUM_OUTPUT_CHANNELS];

    [
     -0.015, -0.022, 0.011,  0.012,
     -0.003, -0.014, 0.009, -0.005
    ] @=> float es8Mins[];

    [
     10.06, 10.075, 10.05, 10.02,
     10.07, 10.04,  10.07, 10.01
    ] @=> float es8Maxs[];

    public void loadConfig() {
        for (0 => int i; i < NUM_OUTPUT_CHANNELS; i++) {
            setMax(i, es8Maxs[i]);
            setMin(i, es8Mins[i]);
        }
    }

    public void setMax(int index, float max) {
        max => voltageMaxs[index];
    }

    public void setMin(int index, float min) {
        min => voltageMins[index];
    }

    public float getAmplitude(int index, float voltage) {
        return Std.scalef(voltage, voltageMins[index], voltageMaxs[index], 0.0, 1.0);
    }

    public float setAnchor(float frequency, float voltage) {
        frequency => anchorFrequency;
        voltage => anchorVoltage;
    }
}


880.0 => float freq;
Math.log2(freq * 0.072727272727272) => float a;
<<< a >>>;

// three volts is 220
// four volts is  440
// five volts is  880
