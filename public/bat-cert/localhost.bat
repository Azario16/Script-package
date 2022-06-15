: Version 1.0
: Author unknown (improved by Kama - wp-kama.ru)
@echo off

: parameters
set DOM=127.0.0.1:444
set DOM_KEY=127.0.0.1
set FOLDER_NAME=localhost
set APACHE_VER=Apache_2.4-PHP_7.2-7.4

: create .txt config file
set config_txt=generate-temp-config.txt
(
	echo nsComment = "Open Server Panel Generated Certificate"
	echo basicConstraints = CA:false
	echo subjectKeyIdentifier = hash
	echo authorityKeyIdentifier = keyid,issuer
	echo keyUsage = nonRepudiation, digitalSignature, keyEncipherment
	echo.
	echo subjectAltName = @alt_names
	echo [alt_names]
	echo DNS.1 = %DOM%
	echo DNS.2 = www.%DOM%
) > %config_txt%

mkdir %FOLDER_NAME%

set OSAPACHE_DIR=%~dp0..\..\..\modules\http\%APACHE_VER%
set OPENSSL_CONF=%OSAPACHE_DIR%\conf\openssl.cnf
"%OSAPACHE_DIR%\bin\openssl" req -x509 -sha256 -newkey rsa:2048 -nodes -days 5475 -keyout %FOLDER_NAME%\%FOLDER_NAME%-rootCA.key -out %FOLDER_NAME%\%FOLDER_NAME%-rootCA.crt -subj /CN=OSPanel-%DOM_KEY%/
"%OSAPACHE_DIR%\bin\openssl" req -newkey rsa:2048 -nodes -days 5475 -keyout %FOLDER_NAME%/%FOLDER_NAME%-server.key -out %FOLDER_NAME%\%FOLDER_NAME%-server.csr -subj /CN=%DOM_KEY%/
"%OSAPACHE_DIR%\bin\openssl" x509 -req -sha256 -days 5475 -in %FOLDER_NAME%\%FOLDER_NAME%-server.csr -extfile %config_txt% -CA %FOLDER_NAME%\%FOLDER_NAME%-rootCA.crt -CAkey %FOLDER_NAME%\%FOLDER_NAME%-rootCA.key -CAcreateserial -out %FOLDER_NAME%\%FOLDER_NAME%-server.crt
"%OSAPACHE_DIR%\bin\openssl" dhparam -out %FOLDER_NAME%\%FOLDER_NAME%-dhparam.pem 2048

del %FOLDER_NAME%\%FOLDER_NAME%-server.csr
del %FOLDER_NAME%\%FOLDER_NAME%-dhparam.pem
del %FOLDER_NAME%\%FOLDER_NAME%-rootCA.srl
del %config_txt%

pause