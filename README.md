## Quản lý phản ánh/kiến nghị

## Cài đặt môi trường
Window 10\
Node 14.15.1\
Npm 6.14.8\
Sql server management studio 2019

## Cài đặt package Npm
```bash
npm install

```

## Start server
'''bash
 cd server
 npm start
'''
## Start client
'''bash
  cd client
  npm start
'''

Start server trước khi start Client để load dữ liệu từ cơ sở dữ liệu tránh bảng rỗng. 
Lưu ý : Cần tạo tài khoản trong SQL để kết nối tới cơ sở dữ liệu
--> 	keyword : Tạo tài khoản 'sa' trong SQL

+ Sửa trong file db.js để config SQL
