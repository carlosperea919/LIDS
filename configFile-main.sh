#!/usr/bin/env bash

YELLOW=$'\033[0;33m'
WHITE=$'\033[0m'

echo -e "\n--DEVCOM--\n"

echo -e "LIDS-D\n"

echo -e "..............\n"

read -p "${YELLOW}Enter Config file path or name(if located in this directory): ${WHITE}" CONFIG_FILE

clear

./reviewAlerts.sh

