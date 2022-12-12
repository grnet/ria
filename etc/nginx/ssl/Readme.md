Generate self-signed certificate for nginx
=========================================
This directory contains self-signed certificates for nginx. They are used for oauth2pa tests.

To generate a new certificate, run the following command:
`openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=ria.gov.gr" -addext "subjectAltName=DNS:ria.gov.gr" -newkey rsa:2048 -keyout ria-selfsigned.key -out ria-selfsigned.crt;`
