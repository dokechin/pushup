#!/bin/perl
# 数字の読み上げを1秒に揃える
for(my $i=0;$i<100;$i++){
  my $command = "sox ./public/clova/" . ($i+1) . ".wav " . "./public/clova/" . ($i+1) . "_.wav trim 0 1";
  system($command);
}

for(my $i=0;$i<100;$i++){
  my $command = "mv ./public/clova/" . ($i+1) . "_.wav " . "./public/clova/" . ($i+1) . ".wav";
  system($command);
}
