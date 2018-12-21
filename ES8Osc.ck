// ES8Osc.ck

// OSC receiver to receive commands from
// the web server.

public class ES8Osc {
    OscIn osc;
    osc.port(12345);
    osc.listenAll();

    OscMsg msg;

    ES8 es8;

    // init
    es8.loadConfig();
    es8.calibrateFrequency(440, 5.0);
    es8.calibratePitch(69, 5.0);

    8 => int NUM_OUTPUTS;
    Step s[NUM_OUTPUTS];

    for (0 => int i; i < NUM_OUTPUTS; i++) {
        s[i] => dac.chan(i);
    }

    public void listen() {
        while (true) {
            osc => now;
            while (osc.recv(msg)) {
                msg.getInt(0) => int index;
                msg.getFloat(0) => float val;

                if (msg.address == "/freq") {
                    s[index].next(es8.freq(index, val));
                }
                if (msg.address == "/volt") {
                    s[index].next(es8.volt(index, val));
                }
                if (msg.address == "/pitch") {
                    s[index].next(es8.pitch(index, val));
                }
            }
        }
    }
}
