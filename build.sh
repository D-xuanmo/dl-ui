#!/bin/bash
cp -r ./README.md ./packages
cp -r ./LICENSE ./packages

yarn build:lib
