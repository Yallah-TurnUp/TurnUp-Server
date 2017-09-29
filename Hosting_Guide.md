# Quick-and-dirty guide to hosting on AWS
Reproduces the currently running instance. Not very secure.

## Setting up an AWS instance
1. Log into https://console.aws.amazon.com
2. From the Services dropdown, select EC2.
3. Click on the button "Launch instance", select Ubuntu server from the list of AMIs.
4. In the customization box that pops up, configure the security group to allow inbound connections for source `0.0.0.0/0` (i.e. worldwide) for:
   1. SSH from port 22
   2. HTTP from port 80
   3. HTTPS from port 443
5. Launch the instance. Make sure to keep the private key to SSH into the machine.
6. Take note of the "IPv4 Public IP" value under the list of running instances - this is the IP address of the instance.

## Setting up the server
1. SSH into the machine. The username for the login should be `ubuntu`, i.e. the command should be like this:

```bash
ssh -i [private key filename] ubuntu@[instance IP address]
```
For example:
```bash
ssh -i pkey.pem ubuntu@56.78.91.234
```

2. Update default packages

```bash
sudo apt-get update
sudo apt-get upgrade
```
If the terminal announces that a new version of `menu.lst` has been changed ([details](https://serverfault.com/questions/645566/a-new-version-of-boot-grub-menu-lst-is-available-when-upgrading-ubuntu-on-an)), choose `keep the local version currently installed`.

3. Install pip

```bash
sudo apt-get install python3-pip
```

4. Install Django and Firebase

```Shell
sudo pip3 install django==1.10
sudo pip3 install requests==1.1.0
sudo pip3 install python-firebase
```

5. Add authentication details file

Example file on Slack is `auth.json` (not `auth.js`). This file should be placed at `TurnUp-Server/TurnUp/TurnUp/auth.json`. The format is:
```json
{
  "firebase_secret": "xxxxxxxxxxxxxxxxxxxxxx",
  "firebase_user": "xx@xx.x",
  "firebase_url": "https://xxxxx.firebaseio.com/",
  "admin_uid": "xxxxxxxxxxx"
}
```
At this point in time, the server is ready to run locally:
```bash
cd TurnUp-Server/TurnUp
python3 manage.py runserver
```
This should not give any errors (the terminal should show the usual `Starting development server at http://127.0.0.1:8000/` message), but the server would still be inaccessible from outside of the machine.

## Setting up nginx
1. Install nginx

```bash
sudo apt-get install nginx
```
The nginx service should start immediately, and you should now see the "Welcome to nginx!" screen when opening the server's IP address on a web browser. If not, run:
```bash
sudo service nginx start
```

2. Serve Django server from nginx

Open the file `/etc/nginx/nginx.conf`. The file is readonly by default, so use `sudo`:
```bash
sudo vi /etc/nginx/nginx.conf
```
The file should look like this:
```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
        worker_connections 768;
        # multi_accept on;
}

http {
    server {
        ##
        # Basic Settings
        ##
        sendfile on;
        tcp_nopush on;
...
```
Before the `Basic Settings`, but still within the `server` block, add some configuration to forward traffic to the Django server:
```nginx
...
http {
    server {
        listen 80;
        server_name 56.78.91.234;

        access_log /var/log/nginx-access.log;
        error_log /var/log/nginx-error.log;
        root /home/ubuntu/TurnUp-Server/TurnUp;

        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_pass_header X-CSRFToken;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location /static/ {
           root /home/ubuntu/TurnUp-Server/TurnUp/business;
        }
        }
        ##
        # Basic Settings
        ##
        sendfile on;
        tcp_nopush on;
...
```
Remember to change the `56.78.91.234` value on the `server_name` entry to the instance IP address.

3. Restart the nginx service

The nginx service does not make the new configurations that we just put in place until it is restarted.
```bash
sudo service nginx restart
```

4. Run the Django webserver

```
cd TurnUp-Server/TurnUp
git checkout runningserver
python3 manage.py runserver
```
Navigating to the instance IP address via a web browser should now show a functioning server.

## Running the server via gunicorn
1. Install gunicorn

```bash
sudo pip3 install gunicorn
```
2. Run the server via gunicorn

Close the currently running server with <kbd>Ctrl+C</kbd>. Then, run:
```bash
cd TurnUp-Server/TurnUp
nohup gunicorn TurnUp.wsgi &
```
(including the <kbd>&</kbd>)

Then press <kbd>Enter</kbd>.

The instance is now running the server on a different thread from the terminal, so it is now possible to stop the SSH session (with the command `exit`) and still have the server running.

## Stopping the server

1. Find the gunicorn process ID:

```bash
ps -ef | grep gunicorn
```
The first few columns of the output should look like this:
```bash
ubuntu    1523     1  0 06:54
ubuntu    1528  1523  0 06:54
ubuntu    2256  1829  0 09:25
```

2. Kill the parent gunicorn process

This is the one with its process ID appearing in both the second and third column.
In the above example, this is `1523`, and the corresponding command is:
```bash
kill 1523
```
To confirm that you've killed the right process, run
```bash
ps -ef | grep gunicorn
```
again. The output should now show only one line, which looks like:
```bash
ubuntu   25475  1412  [...] grep --color=auto gunicorn
```
Navigating to the instance IP address should now result in a 502 Bad Gateway response. To start the server again, simply run `nohup gunicorn TurnUp.wsgi &` (step 2 in the above section).
