#!/bin/perl

my $command = "sox ";
for(my $i=0;$i<100;$i++){
  $command = $command . "./public/clova/" . ($i+1) . ".wav ";
}
$command = $command . "./public/clova/voice_120.wav";
system($command);

$command = "sox ";
for(my $i=0;$i<100;$i++){
  $command = $command . "./public/clova/" . ($i+1) . ".wav ";
  $command = $command . "./public/clova/mute_02sec.wav ";
}
$command = $command . "./public/clova/voice_100.wav";
system($command);

$command = "sox ";
for(my $i=0;$i<100;$i++){
  $command = $command . "./public/clova/" . ($i+1) . ".wav ";
  $command = $command . "./public/clova/mute_05sec.wav ";
}
$command = $command . "./public/clova/voice_80.wav";
system($command);
