
use nodesql;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(36),
  username VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(255)
);

select * from users;