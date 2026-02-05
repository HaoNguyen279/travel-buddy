-- This is my note file, not a readme file --
-- Env set up --
npm install dotenv
Create .env file in root folder project (be)
Add variables to .env like DB_PASS = DWAH4H2HH42JK663JKJK52J
Need to add a line "require("dotenv").config()" before every file that use dotenv in itself

-- Database set up --
To connect with MSSQL, need to 'npm install mssql'
Then create a config file in src\config\db.js


-- Set up local LLM --
Run LLM local server on LMStudio
Then just call it like an API using https request with specific request BODY
Example BODY :
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer lm-studio"
        },
        body: JSON.stringify({
            model: "google/gemma-3-4b",
            messages: [
                {
                    role: "system",
                    content: "Luôn trả lời bằng tiếng Việt, ngắn gọn, văn bản thuần."
                },
                {
                    role: "user",
                    content: "Top 10 địa điểm nổi tiếng du lịch ở việt nam "
                }
            ],
            temperature: 0.7
        })

-- SET UP POSTGRE SQL -- 
1. npm install pg
2. create src\config\db.js file (same as MSSQL)
3. with the config in db.js file :
const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432
});
module.exports = {
    query: (text, params) => pool.query(text, params)
};

duma vailon
Postgre dùng || để nối chuỗi thay vì ' + ' 💀💀💀

-- FETCH TO TEST A POST METHOD --

fetch("http://localhost:3000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({  -- Ở ĐÂY phải dùng stringify sau đó ở express dùng express.json để parse là đc 
    email: "a@test.com",
    password: "123456",
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));

  - Hỏi tại sao cần JSON.stringify ở post request body á thì là do HTTPS chỉ truyền đc dạng text,... ko hiểu object là j nên v đó, stringify xong về parse lại là ok