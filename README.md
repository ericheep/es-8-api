# es8-client

A Vue.js interface that allows for a user to make exactly one edit into a communal sequencer.

After committing a change to the sequence the user's IP address will be banned from making any further changes.

The sequencer is in sync with a Raspberry Pi that is updating an analog synth at 44100 samples per second.

	Vue App <-> Node API Server -> RPi <-> ES-8 DAC/ADC <-> Dixie II
	                            |
	Vue App <-> YouTube Live <- /

[ChucK code](https://github.com/ericheep/eri-Ck/tree/master/es-8)
