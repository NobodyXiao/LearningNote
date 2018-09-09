## MySQL ##

数据库是按照一定数据结构来组织，存储和管理数据的仓库，MYSQL是最流行的关系型数据库，所谓关系型数据库是建立在关系模型基础上的数据库，借用集合代数等数学概念和方法来处理数据库中的数据。

**关系型数据库的术语(RDBMS)**

- **数据库:** 数据库是一些关联表的集合。
- **数据表:** 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
- **列:** 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
- **行：**一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
- **冗余**：存储两倍数据，冗余降低了性能，但提高了数据的安全性。
- **主键**：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
- **外键：**外键用于关联两个表。
- **复合键**：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
- **索引：**使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
- **参照完整性:** 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。

1. **基本命令**

   1.1 启动MYSQL数据库

   * mac上打开“系统偏好设置”，单击下端的“MySQL”图标

   * 在“MySQL”对话框中，单击“启动MySQL服务”按钮。

   * 在弹出的窗口中，输入管理员密码，然后单击“好”按钮

   * 在“MySQL”对话框中，MySQL服务的状态显示为：如下状态表示MySQL服务已经启动。

   * 重置密码

     因为初始密码比较复杂，我们需要将它修改为我们容易记录的密码

     ```
     SET PASSWORD FOR 'root'@'localhost' = PASSWORD('yourpassword')
     
     FLUSH PRIVILEGES;
     ```

   * 为MYSQL设置环境变量

     因为mysql的可执行命令在/usr/local/mysql/bin目录下，而这个目录不在普通用户的环境路径下，因此每次执行时都需要输入完整路径，比较麻烦，因此需要将这个路径添加到环境变量中。首先我们需要创建一个 .bash_profile 文件

     ```
     touch .bash_profile
     ```

     之后创建完成后，用编辑器打开这个文件，添加下面的内容：

     ```
     PATH = /usr/local/mysql/bin:$PATH
     
     export PATH
     ```

     保存退出，然后使用source命令更新

     ```
     source .bash_profile
     ```

     这时候可以输出环境变量看一下，echo $PATH，是否设置成功

   1.2登陆到MYSQL服务，连接上数据库

   ```
   mysql -u root -p
   ```

   1.3退出服务

   ```
   exit;
   ```

   1.4操作某个数据库时，需要提前使用该数据库

   ```
   use database_name;
   ```

   1.5列出 MySQL 数据库管理系统的数据库列表

   ```
   show databases;
   ```

   1.6显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库

   ```
   show tables;
   ```

   1.7显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息

   ```
   show columns from table_name;
   ```

   1.8 显示数据表的详细索引信息，包括PRIMARY KEY（主键）

   ```
   show index from table_name;
   ```

2. **常用指令**

   2.1创建数据库 >>> create database database_name;

   ​    或者使用mysqladmin创建数据库 mysqladmin -u root -p create database_name;

   2.2删除数据库>>> drop database <数据库名>;

      或者使用mysqladmin删除数据库 mysqladmin -u root -p drop database_name;

   2.3选择数据库>>> use database_name;

   2.4创建数据表>>> create table table_name (column_name column_type);

   ```
   CREATE TABLE IF NOT EXISTS `runoob_tbl`(
      `runoob_id` INT UNSIGNED AUTO_INCREMENT,
      `runoob_title` VARCHAR(100) NOT NULL,
      `runoob_author` VARCHAR(40) NOT NULL,
      `submission_date` DATE,
      PRIMARY KEY ( `runoob_id` )
   )ENGINE=InnoDB DEFAULT CHARSET=utf8;
   ```

   2.5删除数据表>>> drop table table_name ;

   2.6插入数据进表>>> INSERT INTO table_name ( field1, field2,...fieldN )  VALUES ( value1, value2,...valueN );

   ```
   INSERT INTO runoob_tbl (runoob_title, runoob_author, submission_date) VALUES
   ("学习 PHP", "菜鸟教程", NOW());
   ```

   2.7查询数据

   查询全部数据>>> select * from table_name;

   查询某些列>>> select column_name,column_name from table_name;

   有条件查询>>> select column_name,column_name from table_name where(条件);

   2.8where查询语句

   ```
   SELECT field1, field2,...fieldN FROM table_name1, table_name2...
   [WHERE condition1 [AND [OR]] condition2.....
   ```

   2.9update数据

   ```
   UPDATE table_name SET field1=new-value1, field2=new-value2
   [WHERE Clause]
   ```

   2.9delete语句

   ```
   DELETE FROM table_name [WHERE Clause]
   ```

   2.10like模糊查询

   ```
   SELECT field1, field2,...fieldN 
   FROM table_name
   WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
   ```

3. **高级指令**

   3.1UNION操作符

   MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。

   ```
   SELECT expression1, expression2, ... expression_n
   FROM tables
   [WHERE conditions]
   UNION [ALL | DISTINCT]
   SELECT expression1, expression2, ... expression_n
   FROM tables
   [WHERE conditions];
   ```

   DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。

   ALL: 可选，返回所有结果集，包含重复数据。

   3.2ORDER BY排序

   ```
   SELECT field1, field2,...fieldN from table_name1, table_name2...
   ORDER BY field1, [field2...] [ASC [DESC]]
   ```

   3.3GROUP BY分组

   GROUP BY 语句根据一个或多个列对结果集进行分组，在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。

   ```
   SELECT column_name, function(column_name)
   FROM table_name
   WHERE column_name operator value
   GROUP BY column_name;
   //SELECT name, COUNT(*) FROM   employee_tbl GROUP BY name;
   ```

   使用WITH ROLLUP

   WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）

   ```
   SELECT name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
   ```

   3.4连接JOIN

   使用 MySQL 的 JOIN 命令，可以在两个或多个表中查询数据。

   - **INNER JOIN（内连接,或等值连接）**：获取两个表中字段匹配关系的记录。
   - **LEFT JOIN（左连接）：**获取左表所有记录，即使右表没有对应匹配的记录。
   - **RIGHT JOIN（右连接）：** 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。

   ```
   SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
   ```

   MySQL left join 与 join 有所不同。 MySQL LEFT JOIN 会读取左边数据表的全部数据，即便右边表无对应数据。

   ```
   SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a LEFT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
   ```

   MySQL RIGHT JOIN 会读取右边数据表的全部数据，即便左边边表无对应数据。

   ```
   SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a RIGHT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
   ```

   3.5对于null值的处理

   MySQL提供了三大运算符，用来处理null值:

   - **IS NULL:** 当列的值是 NULL,此运算符返回 true。
   - **IS NOT NULL:** 当列的值不为 NULL, 运算符返回 true。
   - **<=>:** 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。

   3.6正则匹配

   MySQL 支持正则表达式的匹配， MySQL中使用 REGEXP 操作符来进行正则表达式匹配

   ```
   mysql> SELECT name FROM person_tbl WHERE name REGEXP '^st';
   mysql> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
   mysql> SELECT name FROM person_tbl WHERE name REGEXP 'mar';
   mysql> SELECT name FROM person_tbl WHERE name REGEXP '^[aeiou]|ok$';
   ```

   3.7ALTER命令

   alter命令用来改变数据表名称或者修改数据表的字段等

   * 删除某个字段

   ```
   mysql> ALTER TABLE testalter_tbl  DROP i;
   ```

   * 添加某个字段

   ```
   mysql> ALTER TABLE testalter_tbl ADD i INT;
   ```

   * 如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。

   ```
   ALTER TABLE testalter_tbl DROP i;
   ALTER TABLE testalter_tbl ADD i INT FIRST;
   ALTER TABLE testalter_tbl DROP i;
   ALTER TABLE testalter_tbl ADD i INT AFTER c;
   ```

   * 修改字段的类型和名称，如果需要修改字段类型及名称, 你可以在ALTER命令中使用 MODIFY 或 CHANGE 子句 

   ```
   mysql> ALTER TABLE testalter_tbl MODIFY c CHAR(10);
   ```

   在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型

   ```
   mysql> ALTER TABLE testalter_tbl CHANGE i j BIGINT;
   ```

   * 修改字段的默认值

   ```
   ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
   ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;
   ```

   * 修改表名

   ```
   ALTER TABLE testalter_tbl RENAME TO alter_tbl;
   ```

   3.8临时表

   MySQL 临时表在我们需要保存一些临时数据时是非常有用的。临时表只在当前连接可见，当关闭连接时，Mysql会自动删除表并释放所有空间

   创建临时表的代码和创建真实表时类似的

   ```
   mysql> CREATE TEMPORARY TABLE SalesSummary (
       -> product_name VARCHAR(50) NOT NULL
       -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
       -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
       -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
   );
   ```

   删除临时表

   ```
   DROP TABLE SalesSummary;
   ```

   3.9复制表

   复制一个表大概需要以下步骤：

   - 使用 **SHOW CREATE TABLE** 命令获取创建数据表(**CREATE TABLE**) 语句，该语句包含了原数据表的结构，索引等。

   - 复制以下命令显示的SQL语句，修改数据表名，并执行SQL语句，通过以上命令 将完全的复制数据表结构。

   - 如果你想复制表的内容，你就可以使用 **INSERT INTO ... SELECT** 语句来实现

     ```
     mysql> SHOW CREATE TABLE runoob_tbl \G;
     *************************** 1. row ***************************
            Table: runoob_tbl
     Create Table: CREATE TABLE `runoob_tbl` (
       `runoob_id` int(11) NOT NULL auto_increment,
       `runoob_title` varchar(100) NOT NULL default '',
       `runoob_author` varchar(40) NOT NULL default '',
       `submission_date` date default NULL,
       PRIMARY KEY  (`runoob_id`),
       UNIQUE KEY `AUTHOR_INDEX` (`runoob_author`)
     ) ENGINE=InnoDB 
     
     mysql> CREATE TABLE `clone_tbl` (
       -> `runoob_id` int(11) NOT NULL auto_increment,
       -> `runoob_title` varchar(100) NOT NULL default '',
       -> `runoob_author` varchar(40) NOT NULL default '',
       -> `submission_date` date default NULL,
       -> PRIMARY KEY  (`runoob_id`),
       -> UNIQUE KEY `AUTHOR_INDEX` (`runoob_author`)
     -> ) ENGINE=InnoDB;
     
     mysql> INSERT INTO clone_tbl (runoob_id,
         ->                        runoob_title,
         ->                        runoob_author,
         ->                        submission_date)
         -> SELECT runoob_id,runoob_title,
         ->        runoob_author,submission_date
         -> FROM runoob_tbl;
     ```

   3.10元数据

   MySQL以下三种信息：

   - **查询结果信息：** SELECT, UPDATE 或 DELETE语句影响的记录数。
   - **数据库和数据表的信息：** 包含了数据库及数据表的结构信息。
   - **MySQL服务器信息：** 包含了数据库服务器的当前状态，版本号等。

   获取服务器元数据的命令：

   ```
   SELECT VERSION( )	服务器版本信息
   SELECT DATABASE( )	当前数据库名 (或者返回空)
   SELECT USER( )	当前用户名
   SHOW STATUS	服务器状态
   SHOW VARIABLES	服务器配置变量
   ```

   3.11使用序列

   使用AUTO_INCREMENT

   ```
   mysql> CREATE TABLE insect
       -> (
       -> id INT UNSIGNED NOT NULL AUTO_INCREMENT,
       -> PRIMARY KEY (id),
       -> name VARCHAR(30) NOT NULL, # type of insect
       -> date DATE NOT NULL, # date collected
       -> origin VARCHAR(30) NOT NULL # where collected
   );
   Que
   ```

   重置序列

   如果你删除了数据表中的多条记录，并希望对剩下数据的AUTO_INCREMENT列进行重新排列，那么你可以通过删除自增的列，然后重新添加来实现

   ```
   mysql> ALTER TABLE insect DROP id;
   mysql> ALTER TABLE insect
       -> ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
       -> ADD PRIMARY KEY (id);
   ```

   设置序列的开始值(你可以在创建时设置，也可以后期更改)

   ```
   mysql> ALTER TABLE t AUTO_INCREMENT = 100;
   ```

   3.12索引

   MySQL索引的建立对于MySQL的高效运行是很重要的，索引可以大大提高MySQL的检索速度。创建索引时，你需要确保该索引是应用在SQL 查询语句的条件(一般作为 WHERE 子句的条件)。实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。建立索引会占用磁盘空间的索引文件。

   * 普通索引

   **创建索引**>>> CREATE INDEX indexName ON mytable(username(length)); 

   如果是CHAR，VARCHAR类型，length可以小于字段实际长度；如果是BLOB和TEXT类型，必须指定 length。

   **添加索引**>>>ALTER table tableName ADD INDEX indexName(columnName)

   **创建表的时候直接指定**

   ```
   CREATE TABLE mytable(  
    
   ID INT NOT NULL,   
    
   username VARCHAR(16) NOT NULL,  
    
   INDEX [indexName] (username(length))  
    
   );  
   ```

   **删除索引**>>>DROP INDEX [indexName] ON mytable; 

   * 唯一索引

   它与前面的普通索引类似，不同的就是：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。它有以下几种创建方式

   **创建索引>>>**CREATE UNIQUE INDEX indexName ON mytable(username(length)) 

   **添加索引>>>**ALTER table mytable ADD UNIQUE [indexName] (username(length))

   **创建表的时候直接指定**

   ```
   CREATE TABLE mytable(  
    
   ID INT NOT NULL,   
    
   username VARCHAR(16) NOT NULL,  
    
   UNIQUE [indexName] (username(length))  
    
   ); 
   ```

   **使用ALTER命令添加和删除主键或索引**

   ```
   mysql> ALTER TABLE testalter_tbl MODIFY i INT NOT NULL;
   mysql> ALTER TABLE testalter_tbl ADD PRIMARY KEY (i);
   mysql> ALTER TABLE testalter_tbl DROP PRIMARY KEY;
   ```

   ```
   ALTER TABLE tbl_name ADD PRIMARY KEY (column_list): 该语句添加一个主键，这意味着索引值必须是唯一的，且不能为NULL。
   ALTER TABLE tbl_name ADD UNIQUE index_name (column_list): 这条语句创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）。
   ALTER TABLE tbl_name ADD INDEX index_name (column_list): 添加普通索引，索引值可出现多次。
   ALTER TABLE tbl_name ADD FULLTEXT index_name (column_list):该语句指定了索引为 FULLTEXT ，用于全文索引。
   ```

   **显示索引信息>>>**SHOW INDEX FROM table_name;

   3.13事物

   MySQL 事务主要用于处理操作量大，复杂度高的数据

   - 在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
   - 事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。
   - 事务用来管理 insert,update,delete 语句

   **3.13.1 一般来说，事务是必须满足4个条件（ACID）：：原子性（**A**tomicity，或称不可分割性）、一致性（**C**onsistency）、隔离性（**I**solation，又称独立性）、持久性（**D**urability）**

   - **原子性：**一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
   - **一致性：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
   - **隔离性：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
   - **持久性：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

   **3.13.2 在 MySQL 命令行的默认设置下，事务都是自动提交的，即执行 SQL 语句后就会马上执行 COMMIT 操作。因此要显式地开启一个事务务须使用命令 BEGIN 或 START TRANSACTION，或者执行命令 SET AUTOCOMMIT=0，用来禁止使用当前会话的自动提交。**

   **3.13.3 事物的控制语句**

   - BEGIN或START TRANSACTION；显式地开启一个事务；
   - COMMIT；也可以使用COMMIT WORK，不过二者是等价的。COMMIT会提交事务，并使已对数据库进行的所有修改成为永久性的；
   - ROLLBACK；有可以使用ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；
   - SAVEPOINT identifier；SAVEPOINT允许在事务中创建一个保存点，一个事务中可以有多个SAVEPOINT；
   - RELEASE SAVEPOINT identifier；删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；
   - ROLLBACK TO identifier；把事务回滚到标记点；
   - SET TRANSACTION；用来设置事务的隔离级别。InnoDB存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ和SERIALIZABLE。

   **3.13.4 MYSQL 事务处理主要有两种方法**

   **用 BEGIN, ROLLBACK, COMMIT来实现**

   - BEGIN 开始一个事务
   - ROLLBACK事务回滚
   - COMMIT事务确认

   **直接用 SET 来改变 MySQL 的自动提交模式:**

   - SET AUTOCOMMIT=0禁止自动提交
   - SET AUTOCOMMIT=1 开启自动提交

   3.14处理重复数据

   **防止表中出现重复数据：**

   你可以在MySQL数据表中设置指定的字段为 **PRIMARY KEY（主键）** 或者 **UNIQUE（唯一）** 索引来保证数据的唯一性。如果你想设置表中字段first_name，last_name数据不能重复，你可以设置双主键模式来设置数据的唯一性， 如果你设置了双主键，那么那个键的默认值不能为NULL，可设置为NOT NULL。

   ```
   CREATE TABLE person_tbl
   (
      first_name CHAR(20) NOT NULL,
      last_name CHAR(20) NOT NULL,
      sex CHAR(10),
      PRIMARY KEY (last_name, first_name)
   );
   ```

   **统计重复的记录**

   ```
   mysql> SELECT COUNT(*) as repetitions, last_name, first_name
       -> FROM person_tbl
       -> GROUP BY last_name, first_name
       -> HAVING repetitions > 1;
   ```

   **过滤重复数据**

   ```
   mysql> SELECT DISTINCT last_name, first_name
       -> FROM person_tbl;
   或
   mysql> SELECT last_name, first_name
       -> FROM person_tbl
       -> GROUP BY (last_name, first_name);
   ```

   **删除重复数据**

   ```
   mysql> CREATE TABLE tmp SELECT last_name, first_name, sex FROM person_tbl  GROUP BY (last_name, first_name, sex);
   mysql> DROP TABLE person_tbl;
   mysql> ALTER TABLE tmp RENAME TO person_tbl;
   ```

   3.15MySQL 及 SQL 注入

   如果您通过网页获取用户输入的数据并将其插入一个MySQL数据库，那么就有可能发生SQL注入安全的问题

   **所谓SQL注入，就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令**

   **防止SQL注入的方法**

   ```
   1.永远不要信任用户的输入。对用户的输入进行校验，可以通过正则表达式，或限制长度；对单引号和 双"-"进行转换等。
   2.永远不要使用动态拼装sql，可以使用参数化的sql或者直接使用存储过程进行数据查询存取。
   3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
   4.不要把机密信息直接存放，加密或者hash掉密码和敏感的信息。
   5.应用的异常信息应该给出尽可能少的提示，最好使用自定义的错误信息对原始错误信息进行包装
   6.sql注入的检测方法一般采取辅助软件或网站平台来检测，软件一般采用sql注入检测工具jsky，网站平台就有亿思网站安全平台检测工具。MDCSOFT SCAN等。采用MDCSOFT-IPS可以有效的防御SQL注入，XSS攻击等。
   ```

   3.16导出数据

   MySQL中你可以使用**SELECT...INTO OUTFILE**语句来简单的导出数据到文本文件上

   ```
   mysql> SELECT * FROM runoob_tbl 
       -> INTO OUTFILE '/tmp/runoob.txt';
   ```

   你可以通过命令选项来设置数据输出的指定格式，以下实例为导出 CSV 格式：

   ```
   mysql> SELECT * FROM passwd INTO OUTFILE '/tmp/runoob.txt'
       -> FIELDS TERMINATED BY ',' ENCLOSED BY '"'
       -> LINES TERMINATED BY '\r\n';
   ```

   **SELECT ... INTO OUTFILE 语句有以下属性**

   ```
   1.LOAD DATA INFILE是SELECT ... INTO OUTFILE的逆操作，SELECT句法。为了将一个数据库的数据写入一个文件;使用SELECT ... INTO OUTFILE，为了将文件读回数据库，使用LOAD DATA INFILE。
   2.SELECT...INTO OUTFILE 'file_name'形式的SELECT可以把被选择的行写入一个文件中。该文件被创建到服务器主机上，因此您必须拥有FILE权限，才能使用此语法。
   3.输出不能是一个已存在的文件。防止文件数据被篡改。
   4.你需要有一个登陆服务器的账号来检索文件。否则 SELECT ... INTO OUTFILE 不会起任何作用。
   5.在UNIX中，该文件被创建后是可读的，权限由MySQL服务器所拥有。这意味着，虽然你就可以读取该文件，但可能无法将其删除。
   ```

   **导出表作为原始数据**

   mysqldump 是 mysql 用于转存储数据库的实用程序。它主要产生一个 SQL 脚本，其中包含从头重新创建数据库所必需的命令 CREATE TABLE INSERT 等；使用 mysqldump 导出数据需要使用 --tab 选项来指定导出文件指定的目录，该目标必须是可写的

   ```
   $ mysqldump -u root -p --no-create-info \
               --tab=/tmp RUNOOB runoob_tbl
   password ******
   ```

   **如果你需要导出整个数据库的数据，可以使用以下命令：**

   ```
   $ mysqldump -u root -p RUNOOB > database_dump.txt
   password ******
   ```

   **如果需要备份所有数据库，可以使用以下命令**

   ```
   $ mysqldump -u root -p --all-databases > database_dump.txt
   password ******
   ```

   **导出 SQL 格式的数据**

   ```
   $ mysqldump -u root -p RUNOOB runoob_tbl > dump.txt
   password ******
   ```

   

   3.17导入数据

   **mysql 命令导入**

   使用 mysql 命令导入语法格式为：mysql -u用户名    -p密码    <  要导入的数据库数据(runoob.sql)

   ```
   # mysql -uroot -p123456 < runoob.sql
   ```

   **source命令导入**

   ```
   mysql> create database abc;      # 创建数据库
   mysql> use abc;                  # 使用已创建的数据库 
   mysql> set names utf8;           # 设置编码
   mysql> source /home/abc/abc.sql  # 导入备份数据库
   ```

   **使用load data导入数据**

   MySQL 中提供了LOAD DATA INFILE语句来插入数据。 以下实例中将从当前目录中读取文件 dump.txt ，将该文件中的数据插入到当前数据库的 mytbl 表中。

   ```
   mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl;
   ```

   * 如果指定LOCAL关键词，则表明从客户主机上按路径读取文件。如果没有指定，则文件在服务器上按路径读取文件。
   * 你能明确地在LOAD DATA语句中指出列值的分隔符和行尾标记，但是默认标记是定位符和换行符。
   * 两个命令的 FIELDS 和 LINES 子句的语法是一样的。两个子句都是可选的，但是如果两个同时被指定，FIELDS 子句必须出现在 LINES 子句之前。
   * 如果用户指定一个 FIELDS 子句，它的子句 （TERMINATED BY、[OPTIONALLY] ENCLOSED BY 和 ESCAPED BY) 也是可选的，不过，用户必须至少指定它们中的一个

   ```
   mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl
     -> FIELDS TERMINATED BY ':'
     -> LINES TERMINATED BY '\r\n';	
   ```

   LOAD DATA 默认情况下是按照数据文件中列的顺序插入数据的，如果数据文件中的列与插入表中的列不一致，则需要指定列的顺序

   ```
   mysql> LOAD DATA LOCAL INFILE 'dump.txt' 
       -> INTO TABLE mytbl (b, c, a);
   ```

   **使用 mysqlimport 导入数据　**

   mysqlimport客户端提供了LOAD DATA INFILEQL语句的一个命令行接口。mysqlimport的大多数选项直接对应LOAD DATA INFILE子句

   ```
   $ mysqlimport -u root -p --local database_name dump.txt
   password *****
   ```

   mysqlimport命令可以指定选项来设置指定格式,命令语句格式如下：

   ```
   $ mysqlimport -u root -p --local --fields-terminated-by=":" \
      --lines-terminated-by="\r\n"  database_name dump.txt
   password *****
   ```

   mysqlimport 语句中使用 --columns 选项来设置列的顺序：

   ```
   $ mysqlimport -u root -p --local --columns=b,c,a \
       database_name dump.txt
   password *****
   ```

   

   

   



