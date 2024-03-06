#!/bin/bash

# Defina as variáveis ​​de conexão FTP
FTP_SERVER="$1"
FTP_USERNAME="$2"
FTP_PASSWORD="$3"
FTP_REMOTE_DIR="public_html"
LOCAL_FOLDER="dist/SemanaDaQuimica"

delete_recursive() {
    local remote_path="$1"

    path_list=("$remote_path" "$remote_path/assets" "$remote_path/assets/imgs")

    for item in "${path_list[@]}"; do
                ftp -n $FTP_SERVER <<END_SCRIPT
                quote USER $FTP_USERNAME
                quote PASS $FTP_PASSWORD
                cd "$item"
                prompt off
                mdelete *
                quit
END_SCRIPT
    done
}

upload_recursive() {
    echo "Uploading files to server"
    local local_path="$1"
    local remote_path="$2"
    for item in "$local_path"/*; do
        if [ -d "$item" ]; then
            echo "$item"
            # Create directory on remote server
            ftp -n $FTP_SERVER <<END_SCRIPT
            quote USER $FTP_USERNAME
            quote PASS $FTP_PASSWORD
            mkdir "$remote_path/$(basename "$item")"
            binary
            quit
END_SCRIPT
            upload_recursive "$item" "$remote_path/$(basename "$item")"
        else
            ftp -n $FTP_SERVER <<END_SCRIPT
            quote USER $FTP_USERNAME
            quote PASS $FTP_PASSWORD
            binary
            put "$item" "$remote_path/$(basename "$item")"
            quit
END_SCRIPT
        fi
    done
}


delete_recursive "public_html"

upload_recursive "$LOCAL_FOLDER" "public_html"

exit 0