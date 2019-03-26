#!/bin/bash

# run in bd container running for export sql script
docker exec blog_db_1 sh -c 'exec mysqldump --databases blog -uroot -p"$MYSQL_ROOT_PASSWORD"' > ./sql/blog.sql