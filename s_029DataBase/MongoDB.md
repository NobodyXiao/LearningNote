## Mongodb ##

MongoDB 是一个基于分布式文件存储的数据库。MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| ------------ | ---------------- | ----------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

mongoDB相关操作
1.创建数据库的相关操作：

```
use DATABASE_NAME:如果数据库不存在，则创建数据库，否则切换到指定数据库。
```

2.查看所有的数据库：
    show dbs：但是刚刚创建的数据库不会在列表中，需要先其中加入一些内容之后,才能显示它。
3.删除数据库
    db.dropDatabase():删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名。如果你想
删除某个数据库，需要先切换到这个数据库，之后在使用删除命令

4.创建和删除集合：db.createCollection(name, options)；db.collection.drop();

```
db.createCollection("runoob")
{ "ok" : 1 }

db.mycol2.drop()
```

5.插入文档
    文档的数据结构和JSON基本一样,所有存储在集合中的数据都是BSON格式。
    BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON。
    db.COLLECTION_NAME.insert(document);/ db.col.save(document) ;
5.更新文档
    update();/save();
    update() 方法用于更新已存在的文档 : db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
    save()方法：通过传入的文档来替换已有的文档 db.col.save({"title" : "MongoDB"})
    同时还可以通过命令更新第一条数据，全部数据等等，到时候需要查询新的API
6.删除文档
    MongoDB remove()函数是用来移除集合中的数据。
    db.database.remove(query(删除文档的条件)，{justOne:true/1(表示只删除一个文档)，writeConcern:(抛出异常的级别)});
    eg:db.database.remove({"name":"lili"});//删除name这个条件
7.查询文档
    db.COLLECTION_NAME.find()/db.col.find().pretty()
    find() 方法以非结构化的方式来显示所有文档。/pretty() 方法以格式化的方式来显示所有文档。
    MongoDB AND 条件:
        db.col.find({key1:value1, key2:value2}).pretty();
    MongoDB OR 条件:
        db.col.find({​$or: [{key1: value1}, {key2:value2}]}).pretty();
8.条件操作符
    MangoDB中的条件操作符：(>) 大于 - $gt,(<) 小于 - ​$lt,(>=) 大于等于 - $gte,(<= ) 小于等于 - ​$lte
    假设数据库是这样的，里边有3个文档，那么需要进行相应的查询，示例如下：
    { "_id" : ObjectId("584d5ada795c78e18374c6e7"), "name" : "lili", "age" : "19", "sex" : "woman" }
    { "_id" : ObjectId("584d5aff795c78e18374c6e8"), "name" : "lynn", "age" : "18", "sex" : "woman" }
    { "_id" : ObjectId("584d5b16795c78e18374c6e9"), "name" : "jack", "age" : "22", "sex" : "man" }
    1) db.col.find({"age" : {$gt : "20"}}),需要特别注意一下此处是否由双引号，会影响查询的结果
之后的命令以此类推
	2)MongoDB 使用 (<) 和 (>) 查询 - ​$lt 和 $gt
	db.col.find({"age" : {$lt :"22", $gt : "19"}})
9.​$type条件操作符

​    $type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果. 假设数据库中的文档是这样的：
​     { "_id" : ObjectId("584d5ada795c78e18374c6e7"), "name" : "lili", "age" : 19, "sex" : "woman" }
​     { "_id" : ObjectId("584d5aff795c78e18374c6e8"), "name" : "lynn", "age" : "18", "sex" : "woman" }
​     { "_id" : ObjectId("584d5b16795c78e18374c6e9"), "name" : "jack", "age" : 22, "sex" : "man" }
​     db.col.find({"age" : {$type : 2}}):那么就是获取 "col" 集合中 age 为 String 的数据；
10.MongoDB Limit与Skip方法
​     Limit方法：如果你想从数据库中读取指定数量的数据，那么可以使用Limit()方法：
​    基本语法是这样的：db.COLLECTION_NAME.find().limit(NUMBER):NUMBER指定读取的数量,如果没有指定limit的参数，那么默认是输出所有的数据
​     假设数据库中的文档是这样的：
​     { "_id" : ObjectId("584d5ada795c78e18374c6e7"), "name" : "lili", "age" : 19, "sex" : "woman" }
​     { "_id" : ObjectId("584d5aff795c78e18374c6e8"), "name" : "lynn", "age" : "18", "sex" : "woman" }
​     { "_id" : ObjectId("584d5b16795c78e18374c6e9"), "name" : "jack", "age" : 22, "sex" : "man" }
​     db.col.find({},{"name":1,_id:0}).limit(2),那么只会输出前两行数据中的name键值对???
​     Skip() 方法:使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。
​    基本语法是这样的：db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
​        如果依然是上边的数据库不变，那么 db.col.find({},{"name":1,_id:0}).limit(2).skip(1),那么就会先跳过是一条数据，之后输出后边的两条数据
11.MongoDB 排序
​    在MongoDB中使用使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，
​    并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。
​    基本语法是这样的：db.COLLECTION_NAME.find().sort({KEY:1})	
​    假设数据库中的文档是这样的：
​     { "_id" : ObjectId("584d5ada795c78e18374c6e7"), "name" : "lili", "age" : 19, "sex" : "woman" }
​     { "_id" : ObjectId("584d5aff795c78e18374c6e8"), "name" : "lynn", "age" : 18, "sex" : "woman" }
​     { "_id" : ObjectId("584d5b16795c78e18374c6e9"), "name" : "jack", "age" : 22, "sex" : "man" }
​    db.col.find({},{"name":1,_id:0}).sort({"age":-1}),那么就会按照age降序的顺序输出name筛选出来的3条信息
12.MongoDB 索引
​    MongoDB使用 ensureIndex() 方法来创建索引。
​    ensureIndex()方法基本语法格式如下所示：db.COLLECTION_NAME.ensureIndex({KEY:1})
​    索引实际就是为了快速找到数据库当中的数据而增加的一个编号而已，类似于数组的下标，语法中 
​    Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可。
​    当然你也可以通过多个字段来创建索引:db.col.ensureIndex({"title":1,"description":-1})
​    在后台创建索引：
​        db.values.ensureIndex({open: 1, close: 1}, {background: true})
​    通过在创建索引时加background:true 的选项，让创建工作在后台执行,建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加      	"background" 可选参数。 "background" 默认值为false。
13.MongoDB 聚合
​    MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。基本语法如下所示：
​    db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
​    例如，集合中的数据如下所示：
​    {
​    "_id" : ObjectId("584de00334ffeeca89ed5ff7"),
​    "name" : "jack",
​    "school" : "middle-school1"
​    }
​    {
​    "_id" : ObjectId("584de01834ffeeca89ed5ff8"),
​    "name" : "lili",
​    "school" : "middle-school2"
​    }
​    {
​    "_id" : ObjectId("584de02434ffeeca89ed5ff9"),
​    "name" : "mary",
​    "school" : "middle-school2"
​    }
​    输入db.database2.aggregate([{$group:{_id:"$school",num_tutorial:{$sum:1}}}])之后，输出结果如下所示：
​    { "_id" : "middle-school2", "num_tutorial" : 2 }
​    { "_id" : "middle-school1", "num_tutorial" : 1 }
​    我们通过字段school字段对数据进行分组，并计算school字段相同值的总和。
14.MongoDB 监控
​    MongoDB中提供了mongostat 和 mongotop 两个命令来监控MongoDB的运行情况。
​    mongostat 命令:mongostat是mongodb自带的状态检测工具，在命令行下使用。它会间隔固定时间获取mongodb的当前运行状态，并输出。
​    如果你发现数据库突然变慢或者有其他问题的话，你第一手的操作就考虑采用mongostat来查看mongo的状态。 
​    在ubuntu系统下直接输入mongostat即可运行此命令
​    mongotop 命令:mongotop也是mongodb下的一个内置工具，mongotop提供了一个方法，用来跟踪一个MongoDB的实例
​    查看哪些大量的时间花费在读取和写入数据。 mongotop提供每个集合的水平的统计数据。默认情况下，mongotop返回值的每一秒。 
​    在ubuntu系统下输入mongotop即可运行此命令

15.MongoDB 备份(mongodump)与恢复(mongorestore)
    MongoDB数据备份:在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。
    mongodump命令可以通过参数指定导出的数据量级转存的服务器。
    mongodump命令脚本语法如下： mongodump -h dbhost -d dbname -o dbdirectory
    -h:MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017 
    -d:需要备份的数据库实例，例如：test 
    -o:备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，
    这个目录里面存放该数据库实例的备份数据。 
    MongoDB数据恢复:
    恢复的语法是这样的：mongorestore -h dbhost -d dbname --directoryperdb dbdirectory
    -h:MongoDB所在服务器地址 
    -d:需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2 
    -directoryperdb：
    备份数据所在位置，例如：c:\data\dump\test，这里为什么要多加一个test，而不是备份时候的dump，读者自己查看提示吧！ 
     -drop：
    恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

**关系型数据库和非关系型数据库的优缺点**

```
非关系型数据库的优势：1. 性能NOSQL是基于键值对的，可以想象成表中的主键和值的对应关系，而且不需要经过SQL层的解析，所以性能非常高。2. 可扩展性同样也是因为基于键值对，数据之间没有耦合性，所以非常容易水平扩展。

关系型数据库的优势：1. 复杂查询可以用SQL语句方便的在一个表以及多个表之间做非常复杂的数据查询。2. 事务支持使得对于安全性能很高的数据访问要求得以实现。对于这两类数据库，对方的优势就是自己的弱势，反之亦然。

各个数据之间存在关联是关系型数据库得名的主要原因，为了进行join处理，关系型数据库不得不把数据存储在同一个服务器内，这不利于数据的分散，这也是关系型数据库并不擅长大数据量的写入处理的原因。相反NoSQL数据库原本就不支持Join处理，各个数据都是独立设计的，很容易把数据分散在多个服务器上，故减少了每个服务器上的数据量，即使要处理大量数据的写入，也变得更加容易，数据的读入操作当然也同样容易。
```

参考：https://blog.csdn.net/longxingzhiwen/article/details/53896702