#!/usr/bin/env bash

echo "LIDS-D"

RED=$'\033[0;31m'
WHITE=$'\033[0m'
YELLOW=$'\033[0;33m'

alert1="Known host ping                     "
alert2="Known host website connect          "
alert3="Known host SSH connection           "
alert4="Pings from unknown hosts            "
alert5="Port Scans                          "
alert6="Failed login attempts               "
alert7="Unknown host SSH login              "

case $1 in 
 1)
   echo -e "Alert Stats for Workshop 1\n"
   echo -e "Alert \t \t \t \t \t Count\n"
   echo "1)${alert1}1"
   echo "2)${alert2}3"
   echo "3)${RED}${alert5}2${WHITE}"
   
   echo -e "\n"
   read -p "Enter a number to select alert or 'p'(previous): " SELECT_ALERT

   case $SELECT_ALERT in
    1)
      clear
      ./alertSTAT.sh "${alert1}" 1 "Low" $2 1
      ;;
    2)
      clear
      ./alertSTAT.sh "${alert2}" 3 "Low" $2 1
      ;;
    3)
      clear
      ./alertSTAT.sh "${alert5}" 2 "High" $2 1
      ;;

    p)
      clear
      ./reviewAlerts.sh
      ;;
    *)
      echo "Not an option alert"
      ;;
   esac


   ;;
 2)
   echo -e "Alert Stats for Workshop 2\n"
   echo -e "Alert \t \t \t \t \t Count\n"
   echo "1)${alert3}3"
   echo "2)${RED}${alert7}3${WHITE}"
   echo "3)${alert2}1"

   echo -e "\n"
   read -p "Enter a number to select alert or 'p'(previous): " SELECT_ALERT

   case $SELECT_ALERT in
    1)
      clear
      ./alertSTAT.sh "${alert3}" 3 "Low" $2 2
      ;;
    2)
      clear
      ./alertSTAT.sh "${alert7}" 3 "High" $2 2
      ;;
    3)
      clear
      ./alertSTAT.sh "${alert2}" 1 "Low" $2 2
      ;;
    p)
      clear
      ./reviewAlerts.sh
      ;;


    *)
      echo "Not an option alert"
      ;;
   esac


   ;;

 3)
   echo -e "Alert Stats for Workshop 3\n"
   echo -e "Alert \t \t \t \t \t Count\n"
   echo "1)${alert4}3"
   echo "2)${RED}${alert6}2${WHITE}"
   echo "3)${RED}${alert5}4${WHITE}"
   
   echo -e "\n"
   read -p "Enter a number to select alert or 'p'(previous): " SELECT_ALERT

   case $SELECT_ALERT in
    1)
      clear
      ./alertSTAT.sh "${alert4}" 3 "Low" $2 3
      ;;
    2)
      clear
      ./alertSTAT.sh "${alert6}" 2 "High" $2 3
      ;;
    3)
      clear
      ./alertSTAT.sh "${alert5}" 4 "High" $2 3
      ;;
    p)
      clear
      ./reviewAlerts.sh
      ;;


    *)
      echo "Not an option alert"
      ;;
   esac


   ;;

 *)
   echo "Not an option"
   ;;
esac


