#!/bin/bash
./convert.js testdata/0001-full-carb.csv carb_0001
./convert.js testdata/0001-full-run1.csv mix1_0001_run1
./convert.js testdata/0001-full-run2.csv mix1_0001_run2
./convert.js testdata/0001-full-mix2.csv mix2_0001
./convert.js testdata/0005-full-mix2.csv mix2_0005
./convert.js testdata/0009-full-mix2.csv mix2_0009
./convert.js testdata/0001-outage.csv mix1_0001_out

