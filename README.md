# statusscreen
Webpage in node.js for monitoring the following activities:
- Date and time
- Weather
- Google calendar (upcomming events)
- Västtrafik (next buss)
- Flickr (picture of the day)
- Nest (live camera)

Runned localy on a rasbarry pi 3.


## Set up the pi
Download: https://www.raspberrypi.org/downloads/noobs/  
SD-Card format: Disk Utility (alt. https://www.sdcard.org/downloads/formatter_4/eula_mac/index.html)  

## Set up node
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -  
sudo apt install nodejs  

## Set up git
```
git clone git@github.com:Grains85/statusscreen.git
```

## Add dependencies
```
npm install express flickrapi googleapis mkdirp socket.io sort-map xmlhttprequest --save
```

## Fix Screen resolution and rotation
```
sudo raspi-config
sudo nano /boot/config.txt
	display_rotate=1 90 degrees
```

## Autostart
```
sudo pico .config/lxsession/LXDE-pi/autostart
```
Replace  
@xscreensaver -no-splash
With  
#@xscreensaver -no-splash
Add  
> @/home/pi/foreverStartup.sh
>
> # Normal website that does not need any exceptions
> @/usr/bin/chromium-browser --incognito --start-maximized --kiosk http://127.0.0$
> # Enable mixed http/https content, remember if invalid certs were allowed (ie s$
> #@/usr/bin/chromium-browser --incognito --start-maximized --kiosk --allow-runni$
> @unclutter
> @xset s off
> @xset s noblank
> @xset -dpms

Add autostartscript for Node  
```
sudo -i npm install forever -g
sudo nano /home/pi/foreverStartup.sh
```
Insert  
> #!/bin/bash  
> cd /home/pi/git/statusscreen  
> forever start webserver.js >>/home/pi/output.log 2>>/home/pi/error.log  
