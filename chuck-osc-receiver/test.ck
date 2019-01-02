// main.ck
ES8 es8;

es8.loadConfig();

SndBuf s => dac.chan(0);

"special:dope" => s.read;
while (true) {
    s.pos(0);
    (s.samples() * 2)::samp => now;
}


// Step s => dac.chan(0);

// while (true) {
//    s.next(es8.freq(0, .0));
// }

hour => now;
