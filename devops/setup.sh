#!/bin/bash
#/var/lib/cloud/instance/boot-finished
mkdir ~/test;
################## Environtment ##################
sudo apt update;
sudo apt upgrade;
sudo apt install -y ca-certificates curl gnupg;
sudo mkdir -p /etc/apt/keyrings;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg;
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install nodejs;

sudo npm install pm2 -g;

sudo apt install nginx;
sudo chown -R $USER:$USER /etc/nginx/sites-available/;
sudo rm /etc/nginx/sites-enabled/default;
rm /etc/nginx/sites-available/default;

mkdir ${app_system};
sudo chown -R $USER:$USER ${app_system};
################## Environtment ##################
################## Security ##################
mkdir ${app_system}/keys;
cat > ${app_system}/keys/public.crt << APPCERTIFICATE
${app_certificate_content}
APPCERTIFICATE

cat > ${app_system}/keys/private.key << APPPRIVATEKEY
${app_key_content}
APPPRIVATEKEY

cat > ${app_system}/keys/git.pem << GITKEY
${git_key_content}
GITKEY
################## Security ##################
################## App ##################
cd ${app_system};
eval `ssh-agent -s `;
chmod 400 ${app_system}/keys/git.pem;
ssh-add ${app_system}/keys/git.pem;
git clone ${app_repo} app;
git config --global --add safe.directory ${app_system}/app;
cd ${app_system}/app;
git checkout ${app_branch};
################## App ##################
################## App Backend ##################
cd ${app_system}/app/backend;
mkdir ./storage/;
mkdir ./storage/keys;
cp ${app_system}/keys/public.crt ${app_system}/app/backend/storage/keys/public.crt;
cp ${app_system}/keys/private.key ${app_system}/app/backend/storage/keys/private.key;
cat > ${app_system}/app/backend/.env <<APPENV
${app_env}
port_app=3000
production=1
APPENV
npm install;
################## App Backend ##################
################## App Frontend ##################
sudo cat > /etc/nginx/sites-available/app <<APPFRONTEND
server {
    listen 443 ssl;
    ssl_certificate ${app_system}/keys/public.crt;
    ssl_certificate_key ${app_system}/keys/private.key;
    root ${app_system}/app/frontend/dist/pokemon-team-manager/;
    location / {
        try_files \$uri /index.html;
    }
}
APPFRONTEND
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app
nginx -t
sudo systemctl restart nginx
################## App Frontend ##################