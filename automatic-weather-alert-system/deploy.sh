#!/bin/sh 
cd /Users/C:/BGIS Projects/ICICI
echo “Building React Project …” 
npm run build 
echo “Copying html file …” 
cp -r build html 
echo “Connecting to AWS VM and copying file to /var/www/html/ …” sudo scp -i C:/Users/Sanket singh/Downloads -r html ubuntu@ec2-3-7-73-166.ap-south-1.compute.amazonaws.com:/var/www 
echo “Removing html file from local directory …” 
rm -r html