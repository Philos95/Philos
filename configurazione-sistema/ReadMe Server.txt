INSTALLAZIONE SERVER (LINUX DEBIAN 11 - BULLSEYE)

00) Cambia password Root:
sudo passwd root

01) APT
Aggiungere i repository di apt con il comandi :
echo "deb http://ftp.debian.org/debian unstable main contrib" > /etc/apt/sources.list.d/debian.list

e poi lanciare :
apt update 
apt upgrade

02) APACHE
Installare Apache con il comando :
apt-get install apache2


03) MYSQL 
apt install mysql-server

lanciare poi
mysql_secure_installation ed impostare la password di root 

riavviare mysql con il comando :
/etc/init.d/mysql restart

Se vogliamo che l'utente root possa connettersi anche dall'esterno al db di portal, sarà necessario avviare una sessione mysql
via console ssh, usando il comando :

mysql -u root -p

e poi inserire la password. Una volta avviata la sessione mysql, lanciare il comando :
grant all privileges on NOMEDB.* to root@'%' identified by 'PASSWORDDIROOTMYSQL';

e lanciare poi il comando ;
flush privileges;

terminare la sessione client mysql e riavviare il servizio con il comando :
/etc/init.d/mysql restart

04) PHP 7.3
Installare php con il comando :
apt-get -y install php php-mysql

Installare le estensioni di php con il comando :
apt install php-{mbstring,zip,gd,xml,pear,gettext,cgi}

editare il file di configurazione con il comando:
vim /etc/php/7.3/apache2/php.ini

modificare la riga memory_limit=128M in memory_limit=8192M
modificare la riga upload_max_filesize=2M in upload_max_filesize=1024M
modificare la riga post_max_size=8M in post_max_size=1024M
modificare la riga max_execution_time=30 in max_execution_time=3600
modificare la riga max_input_time=30 in max_input_time=3600
modificare la riga max_input_vars=1000 in max_input_vars=10000

impostare l'error reporting con le relative stringhe, come segue:
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE & ~E_WARNING
display_errors = On
display_startup_errors = On

riavviare apache con il comando :
/etc/init.d/apache2 restart

05) PHPMYADMIN
Installare phpMyAdmin con il comando :
apt-get install phpmyadmin

in caso di errore sulla pagina di import (incompatibilità di phpmyadmin 4.6.6 con php 7.2 o successive) lanciare il comando :
vim /usr/share/phpmyadmin/libraries/plugin_interface.lib.php

cercare la stringa 'if ($options != null && count($options) > 0) {' e sostituirla con 'if ($options != null ) {'

in caso di errore all'apertura di qualsiasi tabella lanciare il comando :
vim /usr/share/phpmyadmin/libraries/sql.lib.php

cercare la stringa '(count($analyzed_sql_results['select_expr'] == 1)' e sostituirla con '((count($analyzed_sql_results['select_expr']) == 1)'

salvare e riavviare apache con il comando:
/etc/init.d/apache2 restart

06) ABILITARE HTTPS 
a) Collegarsi in SSH al server
b) Abilitare il repository stretch-backports di apt-get andando ad editare il file

/etc/apt/sources.list

abilitando od aggiungendo queste due righe 
deb http://deb.debian.org/debian stretch-backports main contrib non-free
deb-src http://deb.debian.org/debian stretch-backports main contrib non-free
c) lanciare il comando : apt-get update
d) lanciare il comando : apt-get install certbot python-certbot-apache -t stretch-backports
e) lanciare il comando : certbot --apache

07) INSTALLARE IL SERVIZIO FTP (vsftpd)
Lanciare il comando :
apt-get install vsftpd


Riavviare il servizio vsftpd con il comando:
/etc/init.d/vsftpd restart

08) CREARE UTENTI FTP (vsftpd)
- Crea un nuovo utente con il comando :
 useradd [user_name]

- Imposta la password per l'utente con il comando:
passwd [user_name]

-Riavviare il servizio vsftpd con il comando:
/etc/init.d/vsftpd restart

