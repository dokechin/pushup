#!/bin/perl

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/bgm_80_" . ($i+1) . ".wav")) {
    $command = $command . "-m ";
    $command = $command . "./public/clova/voice_80.wav ";
    $command = $command . "./public/clova/bgm_80_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/count_80_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/bgm_100_" . ($i+1) . ".wav")) {
    $command = $command . "-m ";
    $command = $command . "./public/clova/voice_100.wav ";
    $command = $command . "./public/clova/bgm_100_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/count_100_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/bgm_120_" . ($i+1) . ".wav")) {
    $command = $command . "-m ";
    $command = $command . "./public/clova/voice_120.wav ";
    $command = $command . "./public/clova/bgm_120_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/count_120_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}
