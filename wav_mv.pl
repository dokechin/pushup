#!/bin/perl

for(my $i=0;$i<100;$i++){
  my $command = "mv ./public/clova/" . ($i+1) . "_.wav " . "./public/clova/" . ($i+1) . ".wav";
  system($command);
}

