#!/usr/bin/env bash

echo "LIDS-D"

RED=$'\033[0;31m'
WHITE=$'\033[0m'
YELLOW=$'\033[0;33m'

echo -e "Alerts\n"

source1="10.0.0.3"
source2="10.0.0.2"
source3="12.5.1.2"


echo -e "\tSource\t\t Destination\t    Severity\t   Reason"

for ((i=1 ; i<=$2 ; i++));
do
   if [ "${3}" == "Low" ]; then
      echo -e "$i\t10.0.0.$i  \t$4\t    $3    \t $1"

   else
      echo -e "$i\t10.0.0.$i  \t$4\t   ${RED} $3 ${WHITE}    \t $1"

   fi
done

echo -e "\n"
read -p "Enter 'p'(previous) or -enter- key to exit: " BACK

echo $BACK
if [ "${BACK}" == "p" ]; then
   clear
   ./alertsTab.sh $5 $4
else
   echo "EXITING..."
fi

sleep 5
