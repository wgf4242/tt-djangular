# path on Server
cd /home/root/sites/tt-djangular
python3 manage.py makemigrations
python3 manage.py migrate
如果有sql语句就执行sql.

superuser adminWgf/wang123456
superuser admin/hello123
# Commit Comment
# Update Server

python3 manage.py makemigrations attendance
python3 manage.py makemigrations line
python3 manage.py migrate
run db tools

cd client
npm run build2

cd ..
python3 manage.py collectstatic
sudo /etc/init.d/nginx restart

# TODO

## BUG

## Todo Feature
正常巡视的故障巡视换位置
Attend 删除  太丑陋了
Defects 查询后应跳转回第一页

1. 添加成功 动画转圈 加绿色提醒。
1. 添加等待超时响应
2. 登录前可以浏览，登录后可以编辑 增加删除改查
1. 巡视加遗留问题，已经核对，详情。 
1. 操作导引
Done Added: Autocomplete support enter complete first.
Done Added: Update array in html after updating backend in month detail.

## Todo backend
权限验证 'DEFAULT_PERMISSION_CLASSES': [],

# Client
## ng serve
ng build --prod --output-path "..\backend\src\static\ang" --watch --output-hashing none 

# Setup Enviroment
npm install

# SysConfig
cd ./client/
npm run build2

# to learn
https://angular.cn/docs/ts/latest/guide/router.html#!#named-outlets
用相对URL导航到危机详情
ViewChildren是什么？

## httpie
用navicat 导入表后提示 **id的错误： id auto increament 被关掉了。

http -f POST http://127.0.0.1:8000/api/persons/ name='x' no=20

	monthname= "x9"comment= "x9"log_user= "x9" archived=0

