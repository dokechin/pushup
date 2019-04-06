#!/bin/perl

for(my $i=0;$i<100;$i++){
  my $command = "mv ./public/clova/" . ($i+1) . "_.mp3 " . "./public/clova/" . ($i+1) . ".mp3";
  system($command);
}

