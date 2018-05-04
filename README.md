# statusscreen
Webpage in node.js for monitoring the following activities:
- Date and time
- Weather
- Google calendar (upcomming events)
- Västtrafik (next buss)
- Flickr (picture of the day)
- Nest (live camera)

Runned localy on a rasbarry pi 3.


## Set up the pi:
Download: https://www.raspberrypi.org/downloads/noobs/  
SD-Card format: Disk Utility (alt. https://www.sdcard.org/downloads/formatter_4/eula_mac/index.html)  

## Set up node:
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -  
sudo apt install nodejs

## Fix Screen resolution and rotation:
```
sudo raspi-config
sudo nano /boot/config.txt
	display_rotate=1 90 degrees
```

## Node at startup:
```
sudo -i npm install forever -g
sudo nano /home/pi/foreverStartup.sh
	#!/bin/bash
	cd /home/pi/git/statusscreen
	forever start webserver.js >>/home/pi/output.log 2>>/home/pi/error.log
```
