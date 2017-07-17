todo 填写人名，
分页list 的html，向前翻可以，后翻error
@done 快速添加写入值
# path on Server

/home/root/sites/tt-djangular
commit cffa06037829d58770d1db7bb0b1bb5c7751561b

superuser adminWgf/wang123456

python3 manage.py makemigrations
python3 manage.py migrate

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
done edit-form 添加日期，月份等readonly模式。
done 本月备注的修改
done 编辑时显示的是是人的id，不是名字。
done 后端添加支持过滤搜索 日期
done defect pagination with drf
上个月的备注不能修改, csrf 错误。如果出错请清除cookie重登录下。
done 本月汇总 不会刷新，所以应改为每次取最后一个月
done 存档按钮
done 搜索过滤 投产 当月填入前端
done 后端添加支持过滤搜索 日期
done 搜索过滤tour
done line-info 添加投产记录没有做
done line info 显示线路信息 没有做
done 添加了投产验收管理
done __编辑出勤有问题__
dene edit-form 添加日期，月份等readonly模式。
done 本月备注的修改
done 编辑时显示的是是人的id，不是名字。
异步多个请求全部处理完成后跳转 forkjoin?
tt-angular post defect有问题
api/defectscat/ error 改 api/defects-cat/
http://47.93.99.61:8000/line/defect 缺陷分类也取不到
电容器统计删除
添加成功提示

明细中的编辑和删除没有做
出勤工时-改出勤天数，添加完成后来个提示。

把editfor和add-form整合一下。


Facitlitycat, 1. api 2, list in facility form html
添加一个新建线路的资料

本月汇总的 日期未显示
本月明细现在有问题
Defects 是分页的应该有问题，暂时未分页

commits 
installed django_filters 

# SysConfig
cd ./client/
npm run build2

## BUG

## Todo backend
没有开启    permission_classes = [] 权限验证
'DEFAULT_PERMISSION_CLASSES': [],
手机视图下右上角按钮展开后，不显示了。


## Todo Feature
1. 添加成功 动画转圈 加绿色提醒。
1. 添加等待超时响应
1. 缺陷处理添加处理人
1. Attend 导出成csv
2. 常规巡视+故障巡视
1. 添加记录
2. 登录前可以浏览，登录后可以编辑 增加删除改查
1. 巡视加遗留问题，已经核对，详情。 加查看线路，

错误提示不完善。
### json 缺陷快捷
导线 弛度大


1. 提交前要过滤出空的数组
2. 要加一个动态删除数组记录的按钮
1. 日期验证 2017-13-50

缺陷导出成xxlsx

### Importtant 
IE支持


# Client
## ng serve

ng build --prod --output-path "..\backend\src\static\ang" --watch --output-hashing none 



# Comment
Now is on dev branch.

# Setup Enviroment
npm install

# to learn
https://angular.cn/docs/ts/latest/guide/router.html#!#named-outlets
用相对URL导航到危机详情

## httpie

用navicat 导入表后提示 **id的错误： id auto increament 被关掉了。


http -f POST http://127.0.0.1:8000/api/persons/ name='x' no=20

    monthname= "x9"comment= "x9"log_user= "x9" archived=0

