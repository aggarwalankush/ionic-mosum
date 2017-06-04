#!/bin/bash

rm -r resources
mkdir resources
cp -r icons/* resources/
ionic cordova resources
