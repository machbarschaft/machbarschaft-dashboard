
IF %1 == admin-dashboard-start (
  REM 'COPY ENVIRONMENT FILES TO SRC DIRECTORY IN ADMIN-DASHBOARD'
  xcopy environments\admin-dashboard\** projects\admin-dashboard\src\environments  /s /e /Y
  REM 'SERVE ADMIN-DASHBOARD'
  ng serve admin-dashboard --port 4200
) ELSE IF %1 == admin-dashboard-build (
  REM 'COPY ENVIRONMENT FILES TO SRC DIRECTORY IN ADMIN-DASHBOARD'
  xcopy environments\admin-dashboard\** projects\admin-dashboard\src\environments  /s /e /Y
  REM 'BUILD ADMIN-DASHBOARD'
  ng build admin-dashboard --prod --aot
) ELSE IF %1 == admin-dashboard-firebase-deploy (
  REM 'COPY FILES FROM DIST TO PUBLIC FOLDER'
  xcopy dist\admin-dashboard\** public /s /e /Y
  REM 'DEPLOY FILES FORM PUBLIC TO FIREBASE'
  firebase deploy
) ELSE (
  ECHO 'COMMAND NOT FOUND'
)
