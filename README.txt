/-*-/

0. 打开mysql数据库.

1. 初始化
cd yzy
./init.sh

2. 运行服务
./start.sh


以后再跑服务  仅仅运行第0, 2步即可， 接口文档在/yzy/doc/uinfo/
请求接口地址: ip地址 + :8000/ + 路径
img_path = '/media/img/'

### 第一次使用接口之前先请求一次第一个接口  会生成200个二维码，用户详情表里才有数据。 然后根据/yzy/qrcode里面的二维码获取id测试.
