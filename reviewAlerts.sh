#!/usr/bin/env bash

RED=$'\033[0;31m'
WHITE=$'\033[0m'
YELLOW=$'\033[0;33m'

echo -e "LIDS-D\n"

echo -e "LNIDS and LIDS Agents are ready to connect\n"

echo "------------"
echo "Network IP's"
echo -e "------------\n"

Node1="Workshop1"
Node2="Workshop2"
Node3="Workshop3"

ip1="192.168.1.1"
ip2="10.0.0.1"
ip3="192.168.0.1"

echo "System Name         IP"
echo "1. ${Node1}       ${ip1}"
echo "2. ${Node2}       ${ip2}"
echo "3. ${RED}${Node3}       ${ip3}${WHITE}"


read -p "Enter a number to review Alerts in node: " SELECT_NODE

case $SELECT_NODE in
 1)
   clear
   ./alertsTab.sh 1 "${ip1}"
   ;;
 2)
   clear
   ./alertsTab.sh 2 "${ip2}"
   ;;
 3)
   clear
   ./alertsTab.sh 3 "${ip3}"
   ;;
 *)
   echo "Not an option"
   ;;
esac


