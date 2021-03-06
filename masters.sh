#!/bin/bash

URL="http://www.espn.com/golf/leaderboard"

if [ -e "/var/www/scritps/playersStats.js" ]
then
    echo "Deleteing File..."	
    sudo rm -f /var/www/scripts/playersStats.js
fi
sudo touch /var/www/scripts/playersStats.js
sudo echo "var players = " >> /var/www/scripts/playersStats.js
curl -Ss "$URL" | \
        pup '.leaderboard-table tbody tr.player-overview json{}' | \
        jq '[.[] | {
                POS: .children[0].text,
		PLAYER: .children[2].children[1].text,
                TOPAR: .children[3].text,
                TODAY: .children[4].text,
                THRU: .children[5].text,
                R1: .children[6].text,
                R2: .children[7].text,
                R3: .children[8].text,
                R4: .children[9].text,
                TOT: .children[10].text,
#                 start: .children[1].text,
#                 ctry: .children[2].children[0].src
        }]' >> /var/www/scripts/playersStats.js
