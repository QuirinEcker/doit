INSERT INTO doit_db.USER (USERNAME, EMAIL, PASSWORD)
    VALUES ('user0', 'user0@gmail.com', 'pw0'),
           ('user1', 'user1@gmail.com', 'pw1'),
           ('user2', 'user2@gmail.com', 'pw3');

INSERT INTO doit_db.TASK_LIST (NAME, USER_ID)
    VALUES ('taskList0', 'user0@gmail.com'),
           ('taskList1', 'user0@gmail.com'),
           ('taskList2', 'user1@gmail.com'),
           ('taskList3', 'user1@gmail.com'),
           ('taskList4', 'user2@gmail.com'),
           ('taskList5', 'user2@gmail.com');