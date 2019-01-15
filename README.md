ES-8-API
--------

A Vue.js interface that allows for a user to make a single change to a sequencer which is controlling an analog synth which that is looping through 44100 pitches/frequencies each second.

After committing a change to the sequence the user's IP will then be banned from making any further changes.

	Vue App <-> Node API Server -> ChucK OSC Script -> ES-8 DAC/ADC -> Dixie II

