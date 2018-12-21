// ES8.ck

public class ES8 {
    8        => int NUM_OUTPUT_CHANNELS;
    0.072727 => float frequencyScalar;
    69       => float pitchOffset;
    5.0      => float pitchVoltageOffset;

    float maxVolts[NUM_OUTPUT_CHANNELS];
    float minVolts[NUM_OUTPUT_CHANNELS];

    [
     -0.015, -0.022, 0.011,  0.012,
     -0.003, -0.014, 0.009, -0.005
    ] @=> float es8MinVolts[];

    [
     10.06, 10.075, 10.05, 10.02,
     10.07, 10.04,  10.07, 10.01
    ] @=> float es8MaxVolts[];

    public void loadConfig() {
        for (0 => int i; i < NUM_OUTPUT_CHANNELS; i++) {
            setMaxVolt(i, es8MaxVolts[i]);
            setMinVolt(i, es8MinVolts[i]);
        }
    }

    public void setMaxVolt(int index, float maxVolt) {
        maxVolt => maxVolts[index];
    }

    public void setMinVolt(int index, float minVolt) {
        minVolt => minVolts[index];
    }

    public void calibratePitch(float pitch, float voltage) {
        pitch => pitchOffset;
        voltage => pitchVoltageOffset;
    }

    public float calibrateFrequency(float frequency, float voltage) {
        Math.pow(2, voltage)/frequency => float frequencyScalar;
    }

    public float volt(int index, float voltage) {
        return Std.scalef(voltage, minVolts[index], maxVolts[index], 0.0, 1.0);
    }

    public float pitch(int index, float pitch) {
        return volt(index, (pitch - pitchOffset) * 1.0/12.0 + pitchVoltageOffset);
    }

    public float freq(int index, float frequency) {
        return volt(index, Math.log2(frequency * frequencyScalar));
    }
}
