from django.http import JsonResponse
from django.shortcuts import render
from .models import *
# from .win32 import *

import qrcode
import os
import json
import MySQLdb
from datetime import datetime
from PIL import Image, ImageFont, ImageDraw

# Create your views here.


def adminLoginer(request):
    '''
    '''
    return render(request, "uinfo/login.html")


def index(request):
    '''
    '''
    return render(request, "uinfo/index.html")


def createNewQrcode(request):
    '''
    creeate new 200 qrcode image object.
    '''
    jsonData = json.loads((request.body).decode('utf8'))
    goodInfo = jsonData['goodInfo']
    goodNum = jsonData['goodNum']
    if request.method == 'POST':
        if not os.access('./qrcode', os.F_OK):
            os.mkdir('./qrcode')

        im = Image.open('./doc/static/origain.jpg')
        font = ImageFont.truetype('./doc/static/test.otf', 29)
        font1 = ImageFont.truetype('./doc/static/test.otf', 33)
        draw = ImageDraw.Draw(im)
        draw.text((152, 164), u'{0}'.format(goodInfo['useDepartment']), fill=(0, 0, 0), font=font)
        draw.text((152, 219), u'{0}'.format(goodInfo['user']), fill=(0, 0, 0), font=font)
        draw.text((152, 275), u'{0}'.format(goodInfo['areastr']), fill=(0, 0, 0), font=font)

        for i in range(goodNum):
            g = Goods()
            g.user = goodInfo['user']
            g.useDepartment = goodInfo['useDepartment']
            g.area = goodInfo['areastr']
            g.recordDate = goodInfo['date']
            g.icon = goodInfo['icon']
            g.save()

            a = Areaed()
            a.username = 'init'
            a.goodsid = g.id
            a.areastr = goodInfo['areastr']
            a.areadate = goodInfo['date']
            a.save()

            saveUri = './qrcode/{0}.jpg'.format(g.id)

            img = qrcode.make("yzy_yzy{0}".format(g.id))
            img.save(saveUri)

            icon = goodInfo['icon']
            if len(icon) > 9:
                icon1 = icon[:9]
                draw.text((140, 58), u'{0}'.format(icon1), fill=(0, 0, 0), font=font1)

                icon = icon[9:]
                draw.text((140, 98), u'{0}'.format(icon), fill=(0, 0, 0), font=font1)
            else:
                draw.text((140, 75), u'{0}'.format(icon), fill=(0, 0, 0), font=font1)
            qrIm = Image.open(saveUri)
            qrIm = qrIm.resize((170, 170))
            im.paste(qrIm, (270, 155, 440, 325))
            im.save(saveUri)
            # printImg(saveUri)
        return JsonResponse({"status": "success"})
    return JsonResponse({"status": "failed", "reason": "request_method_wrong"})


def loginByUser(request):
    '''
    return default user name and password.
    '''
    if request.method == 'GET':
        defaultAdmin = UserInfo.objects.filter(username='admin')
        if not defaultAdmin:
            default = UserInfo()
            default.username = 'admin'
            default.password = 'admin'
            default.save()

        allUser = UserInfo.objects.all()
        userList = []
        for user in allUser:
            dic = {
                "username": user.username,
                "password": user.password
            }
            userList.append(dic)
        context = {
            "error": 1,
            "data": userList
        }
        return JsonResponse(context)


def adminLogin(request):
    '''
    '''
    if request.method == 'POST':
        defaultAdmin = UserInfo.objects.filter(username='admin')
        if not defaultAdmin:
            default = UserInfo()
            default.username = 'admin'
            default.password = 'admin'
            default.save()

        jsonData = json.loads((request.body).decode('utf8'))
        pwd = jsonData['password']
        adminUser = UserInfo.objects.filter(username='admin', password=pwd)
        if adminUser:
            return JsonResponse({"status": "success"})
        return JsonResponse({"status": "failed"})


def createUserByAdmin(request):
    '''
    '''
    if request.method == "POST":
        jsonData = json.loads((request.body).decode('utf8'))
        username = jsonData['username']
        pwd = jsonData['password']

        isHad = UserInfo.objects.filter(username=username)
        if isHad:
            return JsonResponse({"status": "failed", "reason": "name_is_used"})
        else:
            user = UserInfo()
            user.username = username
            user.password = pwd
            user.save()
            return JsonResponse({"status": "success"})


def changepwd(request):
    '''
    '''
    if request.method == "POST":
        jsonData = json.loads((request.body).decode('utf8'))
        username = jsonData['username']
        newPwd = jsonData['newpwd']

        try:
            user = UserInfo.objects.get(username=username)
            user.password = newPwd
            user.save()
            return JsonResponse({"status": "success"})
        except Exception:
            return JsonResponse({"status": "failed", "reason": "no_this_user"})


def updateClientInfo(request):
    '''
    update client info.
    '''
    if request.method == 'GET':
        goodList = Goods.objects.all()
        goodsData = []
        for good in goodList:
            dic = {
                "id": good.id,
                "goodsName": good.goodsName,
                "manageDepartment": good.manageDepartment,
                "useDepartment": good.useDepartment,
                "manager": good.manager,
                "user": good.user,
                "recorder": good.recorder,
                "recordDate": good.recordDate,
                "size": good.size,
                "color": good.color,
                "area": good.area,
                "modelNum": good.modelNum,
                "icon": good.icon,
                "financeRecord": good.financeRecord,
                "goodsImg": None
            }

            if good.goodsImg:
                dic['goodsImg'] = good.goodsImg.name.split('/')[1]
            goodsData.append(dic)

        areaList = Areaed.objects.all()
        areaData = []
        for area in areaList:
            dic = {
                "areastr": area.areastr,
                "areadate": area.areadate,
                "goodsid": area.goodsid
            }
            areaData.append(dic)

        conn = connectMysql()
        c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
        c.execute('select * from assets')
        financeData = c.fetchall()
        for finance in financeData:
            finance['recordednum'] = len(recordNum.objects.filter(recordId=finance['id']))
        c.close()
        conn.close()

        manageDepartment = "财务管理部门"
        instruction = "这是财务管理的首页"

        context = {
            "error": 1,
            "data": {
                "goodsData": goodsData,
                "areaData": areaData,
                "financeData": financeData,
                "manageDepartment": manageDepartment,
                "instruction": instruction
            }
        }
        return JsonResponse(context)
    return JsonResponse({"error": 0, "reason": "request_method_wrong"})


def updateServerInfo(request):
    '''
    update server info
    '''
    jsonData = json.loads((request.POST)["json"])
    # print("data: {0}, type: {1}".format(jsonData, type(jsonData)))
    if request.method == 'POST':

        newList = jsonData['goodsData']
        for new in newList:
            try:
                good = Goods.objects.get(id=new['id'])
            except Exception as f:
                print(f)
                return JsonResponse({"error": 0, "reason": "no_this_id"})
            good.goodsName = new['goodsName']
            good.manageDepartment = new['manageDepartment']
            good.useDepartment = new['useDepartment']
            good.manager = new['manager']
            good.area = new['area']
            good.icon = new['icon']
            good.user = new['user']
            good.recorder = new['recorder']
            if type(new['recordDate']) == int:
                good.recordDate = new['recordDate']
            good.size = new['size']
            if good.goodsImg:
                good.goodsImg.delete()
            good.color = new['color']
            good.modelNum = new['modelNum']
            financeRecord = new['financeRecord']
            if type(financeRecord) == int and financeRecord != 0:
                good.financeRecord = financeRecord
                rList = recordNum.objects.filter(goodsId=new['id'])
                for i in rList:
                    i.delete()
                r = recordNum()
                r.goodsId = new['id']
                r.recordId = financeRecord
                r.save()
            good.save()

        areaList = jsonData['areaData']
        for area in areaList:
            isIn = Areaed.objects.filter(goodsid=area['goodsid'], areastr=area['areastr'], areadate=area['areadate'])
            if isIn:
                continue
            a = Areaed()
            a.goodsid = area['goodsid']
            a.areastr = area['areastr']
            a.areadate = area['areadate']
            a.save()

        return JsonResponse({'error': 1})
    return JsonResponse({"error": 0, "reason": "request_method_wrong"})


def updateServerImg(request):
    '''
    '''
    files = request.FILES.values()
    if request.method == 'POST':
        for file in files:
            # print(file)
            try:
                idNum = int(os.path.split(file.name)[1].split('_')[0])
                # print(idNum)
                a = Goods.objects.get(id=idNum)
                if a.goodsImg:
                    a.goodsImg.delete()
                a.goodsImg = file
                a.save()
            except Exception as f:
                print(f)
                return JsonResponse({"error": 0, "reason": "no_this_id"})
        return JsonResponse({"error": 1})
    return render(request, 'uinfo/img.html')


def connectMysql():
    '''
    connect to mysql database
    '''
    conn = MySQLdb.connect(user='root', password='123.com', host='localhost', port=3306, db='uinfo', charset='utf8')
    return conn


def addNewRecord(request):
    '''
    '''
    jsonData = json.loads((request.body).decode('utf8'))
    # print(jsonData)
    if request.method == 'POST':
        keyList = ["certificate", "assetnum", "subjectcode", "assetname", "recorddate", 'models', "abstracts", "primprice", "primnum",
                   "primamount", "access", "mdepartment", "fdepartment", "udepartment", "ustatus", "saveman", "orderno",
                   "usefixedyear", "nownum", "nowprice", "fored", "accountingnum", "bookedicon", "nullifyicon", "recordman",
                   "sourcemd", "area", "itemcode"]
        sql = '''INSERT INTO assets ('''
        values = []
        for key in keyList:
            try:
                if jsonData[key] == '':
                    values.append(None)
                else:
                    if key == 'recorddate':
                        values.append(datetime.strptime(jsonData[key], "%Y-%m-%d"))
                    elif key in ["certificate", "primprice", "primnum", "primamount", "orderno", "usefixedyear", "nownum", "nowprice"]:
                        values.append(int(jsonData[key]))
                    else:
                        values.append(jsonData[key])
            except Exception as f:
                print(f)
                return JsonResponse({"status": "failed", "reason": "key_error"})
            sql += key + ','
        sql = sql[:-1] + ''') VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
        # print('sql: {0}, values: {1}'.format(sql, values))
        conn = connectMysql()
        c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
        c.execute(sql, values)
        c.close()
        conn.commit()
        conn.close()
        return JsonResponse({"status": "success"})


def removeRecord(request):
    '''
    '''
    jsonData = json.loads((request.body).decode('utf8'))
    if request.method == 'POST':
        conn = connectMysql()
        c = conn.cursor(cursorclass=MySQLdb.cursors.DictCursor)
        idList = jsonData['id']
        tupId = "(" + str(idList)[1:-1] + ")"
        sql = '''delete from assets where id in {0}'''.format(tupId)
        try:
            c.execute(sql)
            c.close()
            conn.commit()
            conn.close()
            return JsonResponse({'status': "success"})
        except Exception:
            return JsonResponse({"status": "failed", "reason": "no_this_id"})


def createRepeatqrcode(request):
    '''
    '''
    jsonData = json.loads((request.POST)["json"])
    if request.method == 'POST':
        new = jsonData['goodsData']
        gid = new['id']
        try:
            good = Goods.objects.get(id=gid)
        except Exception:
            return JsonResponse({"error": 0, "reason": "no_this_id"})
        good.goodsName = new['goodsName']
        good.manageDepartment = new['manageDepartment']
        good.useDepartment = new['useDepartment']
        good.manager = new['manager']
        good.area = new['area']
        good.icon = new['icon']
        good.user = new['user']
        good.recorder = new['recorder']
        good.recordDate = new['recordDate']
        good.size = new['size']
        good.color = new['color']
        good.modelNum = new['modelNum']
        good.goodsImg.delete()
        financeRecord = new['financeRecord']
        if type(financeRecord) == int:
            good.financeRecord = financeRecord
            rList = recordNum.objects.filter(goodsId=good.id)
            for i in rList:
                i.delete()
            r = recordNum()
            r.goodsId = good.id
            r.recordId = financeRecord
            r.save()
        good.save()

        if 'areaData' in jsonData.keys() and jsonData['areaData']:
            areaList = jsonData['areaData']
            for area in areaList:
                isIn = Areaed.objects.filter(goodsid=area['goodsid'], areastr=area['areastr'], areadate=area['areadate'])
                if isIn:
                    continue
                a = Areaed()
                a.goodsid = area['goodsid']
                a.areastr = area['areastr']
                a.areadate = area['areadate']
                a.save()

        files = request.FILES.values()
        if files:
            for file in files:
                try:
                    idNum = int(os.path.split(file.name)[1].split('_')[0])
                    a = Goods.objects.get(id=idNum)
                    a.goodsImg = file
                    a.save()
                except Exception as f:
                    print(f)
                    return JsonResponse({"error": 0, "reason": "no_this_id"})

        im = Image.open('./doc/static/origain.jpg')
        font = ImageFont.truetype('./doc/static/test.otf', 29)
        font1 = ImageFont.truetype('./doc/static/test.otf', 33)
        draw = ImageDraw.Draw(im)
        icon = good.icon
        if len(icon) > 9:
            icon1 = icon[:9]
            draw.text((140, 58), u'{0}'.format(icon1), fill=(0, 0, 0), font=font1)

            icon = icon[9:]
            draw.text((140, 98), u'{0}'.format(icon), fill=(0, 0, 0), font=font1)
        else:
            draw.text((140, 75), u'{0}'.format(icon), fill=(0, 0, 0), font=font1)
        draw.text((152, 164), u'{0}'.format(good.useDepartment), fill=(0, 0, 0), font=font)
        draw.text((152, 219), u'{0}'.format(good.user), fill=(0, 0, 0), font=font)
        draw.text((152, 275), u'{0}'.format(good.area), fill=(0, 0, 0), font=font)
        saveUri = './qrcode/{0}.jpg'.format(good.id)

        img = qrcode.make("yzy_yzy{0}".format(good.id))
        img.save(saveUri)

        qrIm = Image.open(saveUri)
        qrIm = qrIm.resize((170, 170))

        im.paste(qrIm, (270, 155, 440, 325))
        im.save(saveUri)
        # printImg(saveUri)
        return JsonResponse({"error": 1})


def deleteGoodsOrShow(request):
    '''
    '''
    jsonData = json.loads((request.body).decode('utf8'))
    print(jsonData)
    goodsId = jsonData["goodsid"]
    method = jsonData["method"]
    if method == "remove":
        try:
            a = Goods.objects.get(id=goodsId)
            a.delete()
        except Exception:
            pass
        areaList = Areaed.objects.filter(goodsid=goodsId)
        for i in areaList:
            i.delete()
        reList = recordNum.objects.filter(goodsId=goodsId)
        for i in reList:
            i.delete()
        return JsonResponse({"status": "success"})
    elif method == "img":
        try:
            a = Goods.objects.get(id=goodsId)
        except Exception:
            return JsonResponse({"status": "failed", "reason": "id_wrong"})
        if a.goodsImg:
            if 'type' in jsonData.keys() and jsonData['type'] == 'remove':
                a.goodsImg.delete()
                return JsonResponse({"status": "success"})
            return JsonResponse({"status": "success", "path": a.goodsImg.name.split('/')[1]})
        else:
            return JsonResponse({"status": "failed", "reason": "NO_PICTURE"})
