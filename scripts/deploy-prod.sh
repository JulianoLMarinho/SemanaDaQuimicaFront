#!/bin/bash

# Defina as variáveis ​​de conexão FTP
FTP_SERVER="ftp.semanadaquimicaufrj.com.br"
FTP_USER="semanadaquimicau1"
FTP_PASS="mSwC#7i9gv\$7cXT"
FTP_REMOTE_DIR="/home/semanadaquimicau1/"


# Iniciar sessão FTP e fazer upload do arquivo
ftp -n $FTP_SERVER <<END_SCRIPT
quote USER $FTP_USER
quote PASS $FTP_PASS
cd public_html
ls
quit
END_SCRIPT

exit 0