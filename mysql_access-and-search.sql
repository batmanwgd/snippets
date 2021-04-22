-- allow user `root` from any host to access the server.
Grant All Privileges ON *.* to 'root'@'%' Identified By 'root'; FLUSH PRIVILEGES;

-- list of function procedures.
SHOW FUNCTION STATUS;

-- list all triggers.
SHOW TRIGGERS;

-- shows create table schema.
SHOW CREATE TABLE `users`

-- search full-text
SELECT * FROM movies WHERE MATCH(title, description) AGAINST('lord of the rings' IN NATURAL LANGUAGE MODE);
SELECT * FROM movies WHERE MATCH(title, description) AGAINST ('+Marvel -avengers' IN BOOLEAN MODE);

