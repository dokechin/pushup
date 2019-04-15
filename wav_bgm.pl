#!/bin/perl
my @bgm60 = (
  "looperman-l-0207475-0146268-meditation.wav",
  "looperman-l-0207475-0160410-your-far-away-love.wav",
  "looperman-l-1320412-0108465-jakeletts-generic-hiphop-lead.wav",
  "looperman-l-2218475-0145986-piano-for-rainy-days.wav",
  "looperman-l-2516874-0145804-travis-scott-type-electric-piano-60.wav",
  "looperman-l-2654697-0137316-classic-guitar-105.wav",
  "looperman-l-2654697-0155335-violin-ensemble-3901.wav",
);
my @bgm80 = (
  "looperman-l-0233631-0021363-jdot2006-relax4awhilebeat.wav",
  "looperman-l-0782612-0082005-40a-color-combination.wav",
  "looperman-l-0782612-0120308-40a-the-mood.wav",
  "looperman-l-1414881-0141164-less-than-love-4-bpm-80-key-a.wav",
  "looperman-l-1441718-0152140-new-era-malianteo-string.wav",
  "looperman-l-1839483-0125395-ageless-battle-strings.wav",
  "looperman-l-2283018-0119951-amusah-stacc-strings-section-d-minor-80-bpm.wav",
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

  my $command = "sox ./bgm/60/". $_ ." ./bgm/60/." . $_ . " repeat 20";
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

  my $command = "sox ./bgm/80/". $_ ." ./bgm/80/." . $_ . " repeat 20";
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

