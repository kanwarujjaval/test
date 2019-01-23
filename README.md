prerequisites->
mysql 
redis

steps:
npm install
npm index

swagger docs->
http://localhost:8080/documentation#/

user table
+----------+---------------------+------+-----+---------+----------------+
| Field    | Type                | Null | Key | Default | Extra          |
+----------+---------------------+------+-----+---------+----------------+
| id       | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| username | varchar(80)         | NO   | UNI | NULL    |                |
| password | varchar(200)        | NO   |     | NULL    |                |
+----------+---------------------+------+-----+---------+----------------+

contact table
+-------------+---------------------+------+-----+---------+----------------+
| Field       | Type                | Null | Key | Default | Extra          |
+-------------+---------------------+------+-----+---------+----------------+
| id          | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| name        | varchar(200)        | NO   | MUL | NULL    |                |
| email       | varchar(200)        | NO   |     | NULL    |                |
| phonenumber | varchar(20)         | NO   |     | NULL    |                |
| userId      | bigint(20) unsigned | NO   | MUL | NULL    |                |
+-------------+---------------------+------+-----+---------+----------------+
indexes
+---------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| Table   | Non_unique | Key_name   | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment | Visible | Expression |
+---------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+
| contact |          0 | PRIMARY    |            1 | id          | A         |           0 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
| contact |          0 | id         |            1 | id          | A         |           0 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
| contact |          1 | idx_userId |            1 | userId      | A         |           0 |     NULL |   NULL |      | BTREE      |         |               | YES     | NULL       |
| contact |          1 | idx_se     |            1 | name        | NULL      |           0 |     NULL |   NULL |      | FULLTEXT   |         |               | YES     | NULL       |
| contact |          1 | idx_se     |            2 | email       | NULL      |           0 |     NULL |   NULL |      | FULLTEXT   |         |               | YES     | NULL       |
+---------+------------+------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+---------+------------+

