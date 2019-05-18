#!/bin/perl

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/count_60_" . ($i+1) . ".wav")) {
    $command = $command . "./public/clova/gong-played1.wav ";
    $command = $command . "./public/clova/count_60_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/.count_60_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}
for(my $i=0;$i<7;$i++){
  my $command = "mv ./public/clova/.count_60_" . ($i+1) . ".wav ./public/clova/count_60_" . ($i+1) . ".wav";
  system($command);
}

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/count_80_" . ($i+1) . ".wav")) {
    $command = $command . "./public/clova/gong-played1.wav ";
    $command = $command . "./public/clova/count_80_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/.count_80_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}
for(my $i=0;$i<7;$i++){
  my $command = "mv ./public/clova/.count_80_" . ($i+1) . ".wav ./public/clova/count_80_" . ($i+1) . ".wav";
  system($command);
}

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/count_100_" . ($i+1) . ".wav")) {
    $command = $command . "./public/clova/gong-played1.wav ";
    $command = $command . "./public/clova/count_100_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/.count_100_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}
for(my $i=0;$i<7;$i++){
  my $command = "mv ./public/clova/.count_100_" . ($i+1) . ".wav ./public/clova/count_100_" . ($i+1) . ".wav";
  system($command);
}

my $command = "sox ";
for(my $i=0;$i<7;$i++){
  if (-e ("./public/clova/count_120_" . ($i+1) . ".wav")) {
    $command = $command . "./public/clova/gong-played1.wav ";
    $command = $command . "./public/clova/count_120_" . ($i+1) . ".wav ";
    $command = $command . "./public/clova/.count_120_" . ($i+1) . ".wav";
    print ($command);
    print ("\n");
    system($command);
    $command = "sox ";
  }
}
for(my $i=0;$i<7;$i++){
  my $command = "mv ./public/clova/.count_120_" . ($i+1) . ".wav ./public/clova/count_120_" . ($i+1) . ".wav";
  system($command);
}
