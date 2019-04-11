#!/bin/perl
my @bgm80 = (
  "121_dr_bpm080_4-4_rock.wav",
  "122_dr_bpm080_4-4_rock.wav",
  "123_dr_bpm080_4-4_rock.wav",
  "124_dr_bpm080_4-4_rock.wav",
  "125_dr_bpm080_4-4_rock.wav",
  "126_dr_bpm080_4-4_rock.wav",
  "127_dr_bpm080_4-4_rock.wav",
);
my @bgm100 = (
  "101_dr_bpm100_4-4_rock.wav",
  "102_dr_bpm100_4-4_rock.wav",
  "103_dr_bpm100_4-4_rock.wav",
  "104_dr_bpm100_4-4_rock.wav",
  "105_dr_bpm100_4-4_rock.wav",
  "106_dr_bpm100_4-4_rock.wav",
  "107_dr_bpm100_4-4_rock.wav",
);
my @bgm120 = (
  "081_dr_bpm120_4-4_rock.wav",
  "082_dr_bpm120_4-4_rock.wav",
  "083_dr_bpm120_4-4_rock.wav",
  "084_dr_bpm120_4-4_rock.wav",
  "085_dr_bpm120_4-4_rock.wav",
  "086_dr_bpm120_4-4_rock.wav",
  "087_dr_bpm120_4-4_rock.wav",
);

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

my $command = "rm ./bgm/80/.* ./bgm/100/.* ./bgm/120/.*";
print ($command);
print ("\n");
system($command);

