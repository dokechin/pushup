#!/bin/perl
my @bgm60 = (
  "looperman-l-0592478-0123555-designedimpression-drum-loop-airheads.wav",
  "looperman-l-0671112-0070394-danke-ambient-drum-loop.wav",
  "looperman-l-0878398-0092130-keishh-maxed-out-percs-4.wav",
  "looperman-l-1320412-0108464-jakeletts-lagato-808-drum-loop.wav",
  "looperman-l-1581687-0132854-2nick8-hiccup-beat.wav",
  "looperman-l-2041494-0102629-sinomusic-sino-music-delay-arps.wav",
  "looperman-l-2893278-0142545-happy-halloween-hiphop-drum-loop.wav",
);
my @bgm80 = (
  "121_dr_bpm080_4-4_rock.wav",
  "looperman-l-0233631-0021363-jdot2006-relax4awhilebeat.wav",
  "looperman-l-0842499-0146015-hiphop-drums.wav",
  "looperman-l-1441718-0152140-new-era-malianteo-string.wav",
  "looperman-l-1839483-0125395-ageless-battle-strings.wav",
  "looperman-l-2295222-0154088-cam-drums.wav",
  "looperman-l-2767269-0147140-original-80s-beat-sample-35.wav",
);
my @bgm100 = (
  "looperman-l-0039029-0008553-rei4real-rei-shine-100-bpm.wav",
  "looperman-l-0111346-0040598-planetjazzbass-space-junkie.wav",
  "looperman-l-0173301-0160446-marimbamelody-iii.wav",
  "looperman-l-0310407-0026056-fella1-groove-e.wav",
  "looperman-l-1564425-0110478-rasputin1963-coffee-colored-you.wav",
  "looperman-l-2212484-0156046-more-moombathon-drums.wav",
  "looperman-l-2707895-0128753-trap-drums-and-brass.wav",
);
my @bgm120 = (
  "looperman-l-0159051-0037203-minor2go-m2g-mix-discofox.wav",
  "looperman-l-0173301-0106381-eendee-taptap.wav",
  "looperman-l-0576432-0080273-kaynine-funkee-drumloop.wav",
  "looperman-l-1319133-0089199-fanto8bc-percu-drum-by-fanto-8-bc.wav",
  "looperman-l-1319133-0154452-synth-elec.wav",
  "looperman-l-2224707-0139761-dance-dance-dance-120bpm.wav",
  "looperman-l-2367733-0114199-theflakesmaster-dance-beat.wav",
);

$index = 1;
foreach(@bgm60){

  my $command = "sox ./bgm/60/". $_ ." ./bgm/60/." . $_ . " repeat 40";
  print ($command);
  print ("\n");
  system($command);

  my $command = "sox ./bgm/60/." . $_ . " ./public/clova/bgm_60_" . $index . ".wav trim 0 200";
  print ($command);
  print ("\n");
  system($command);

  $index++;
}

$index = 1;
foreach(@bgm80){

  my $command = "sox ./bgm/80/". $_ ." ./bgm/80/." . $_ . " repeat 30";
  print ($command);
  print ("\n");
  system($command);

  my $command = "sox ./bgm/80/." . $_ . " ./public/clova/bgm_80_" . $index . ".wav trim 0 150";
  print ($command);
  print ("\n");
  system($command);

  $index++;
}

$index = 1;
foreach(@bgm100){

  my $command = "sox ./bgm/100/". $_ ." ./bgm/100/." . $_ . " repeat 20";
  print ($command);
  print ("\n");
  system($command);

  my $command = "sox ./bgm/100/." . $_ . " ./public/clova/bgm_100_" . $index . ".wav trim 0 120";
  print ($command);
  print ("\n");
  system($command);

  $index++;
}

$index = 1;
foreach(@bgm120){

  my $command = "sox ./bgm/120/". $_ ." ./bgm/120/." . $_ . " repeat 20";
  print ($command);
  print ("\n");
  system($command);

  my $command = "sox ./bgm/120/." . $_ . " ./public/clova/bgm_120_" . $index . ".wav trim 0 100";
  print ($command);
  print ("\n");
  system($command);

  $index++;
}

my $command = "rm ./bgm/60/.* ./bgm/80/.* ./bgm/100/.* ./bgm/120/.*";
print ($command);
print ("\n");
system($command);

