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
添加检修没有按钮

## BUG
12月最后一天，没有月报统计里的searchbar没有显示 12/31
投产验收，日期未格式化，改成我的自定义控件

## Todo Feature
添加临时工作，自动补全：应该把查询范围扩大到一年。
文档添加，从后台进入人员管理，勾选隐藏来，隐藏人员
将person组加进去。
验收搭火没有显示分支，比如源二丙线36---实际是源二丙线“二分支36#杆”
添加故障分类

线路巡视添加 下拉线路
添加工作量，下拉查询至上一年的下拉
Attend 删除  太丑陋了
Defects 查询后应跳转回第一页

1. 添加成功 动画转圈 加绿色提醒。
1. 添加等待超时响应
2. 登录前可以浏览，登录后可以编辑 增加删除改查
1. 巡视加遗留问题，已经核对，详情。 
1. 操作导引


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

