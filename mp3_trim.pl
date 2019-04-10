#!/bin/perl

for(my $i=0;$i<100;$i++){
  my $command = "sox ./public/clova/" . ($i+1) . ".mp3 " . "./public/clova/" . ($i+1) . "_.wav trim 0 1";
  system($command);
}

