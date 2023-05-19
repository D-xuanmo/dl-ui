#!/bin/sh

cd packages/dl-common && yarn build && yarn link

yarn workspace @xuanmo/dl-ui link "@xuanmo/dl-common" -W
