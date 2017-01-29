#!/bin/bash
echo 'innoeye123' | sudo -S cp -r $1 $2
echo 'innoeye123' | sudo -S service apache2 restart
