#!/bin/bash
if [ "$1" == "admin-dashboard-start" ]; then
	cp environments/admin-dashboard/** projects/admin-dashboard/src/environments && ng serve admin-dashboard --port 4200
elif [ "$1" == "admin-dashboard-build" ]; then
	cp environments/admin-dashboard/** projects/admin-dashboard/src/environments && ng build admin-dashboard --prod --aot
elif [ "$1" == "admin-dashboard-firebase-deploy" ]; then
	cp dist/admin-dashboard/** public -r && firebase deploy
fi

