import json
import random
import re
import time

import requests
requests.packages.urllib3.disable_warnings()
from bs4 import BeautifulSoup


def getPid():
    S = requests.Session()
    S.headers.update({
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; CLT-AL00 Build/HUAWEICLT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045332 Mobile Safari/537.36 V1_AND_SQ_8.4.8_1492_YYB_D QQ/8.4.8.4810 NetType/4G WebP/0.3.0 Pixel/1080 StatusBarHeight/81 SimpleUISwitch/0 QQTheme/1000 InMagicWin/0',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    })
    S.verify = False
    try:
        r = S.get('https://ehall.jlu.edu.cn/jlu_portal/login')
        soup = BeautifulSoup(r.text, 'lxml')
        pid = soup.find('input', attrs={'name':'pid'}).get('value')
        return {'S': S, 'pid': pid}
    except Exception as e:
        print(str(e))
        return False


def login(name, pwd, pid, S):
    params = {
        'username': name,
        'password': pwd,
        'pid': pid
    }
    try:
        response = S.post(
            'https://ehall.jlu.edu.cn/sso/login',
            data=params)
        soup = BeautifulSoup(response.text, 'lxml')
        if soup.title.text == '吉林大学网上办事大厅':
            return S
        else:
            return False
    except requests.exceptions.ConnectionError as e:
        print('连接错误，重试')
        print(e)
        return 'ConnectError'
    except Exception as e:
        print('出现登录错误')
        print(str(e))
        return False

def getFormPage(url, S):
    response = S.post(
        url,
        verify=False
    )
    soup = BeautifulSoup(response.text, 'lxml')
    result = {
        'url': response.url,
        'csrf': soup.find('meta', itemscope='csrfToken')['content']
    }
    return result

def getFormInfo(number, url, crsf, S):
    pargam = {
        'stepId': number,
        'admin': 'false',
        'csrfToken': crsf
    }
    S.headers.update({'referer': url})
    response = S.post(
        'https://ehall.jlu.edu.cn/infoplus/interface/render',
        data=pargam
    )
    return response.json()['entities'][0]['data']

def makeFormData(url, formdata):
    formdata['_VAR_URL'] = url
    if formdata['fieldXY1'] == '1':
        formdata['fieldZhongtw'] = '1'
    if formdata['fieldXY2'] == '1':
        formdata['fieldWantw'] = '1'
    formdata['fieldDJXXyc'] = '1'
    return formdata

def postmsg(number, csrf, forminfo, S):
    times = int(time.time())
    data = json.dumps(forminfo)
    boundFields = ','.join(forminfo.keys())
    pargam = {
        'formData': data,
        'nextUsers': '{}',
        'rand': random.uniform(100, 999),
        'boundFields': boundFields,
        'timestamp': times,
        'csrfToken': csrf,
        'stepId': number,
        'actionId': '1'
    }
    try:
        response = S.post(
            'https://ehall.jlu.edu.cn/infoplus/interface/doAction',
            data=pargam,
            verify=False)
        return response.json()['errno'] == 0
    except:
        return False

def postMsg(r):
    Sresult = getPid()
    S = login(r[0], r[1], Sresult['pid'], Sresult['S'])
    if S == 'ConnectError':
        postMsg(r)
    elif S:  # 登录
        url = 'https://ehall.jlu.edu.cn/infoplus/form/BKSMRDK/start'  # 获取url
        resurl = getFormPage(url, S)  # 获取csrf和返回的url
        times = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        forminfo = getFormInfo(resurl['url'].split('/')[-2], resurl['url'], resurl['csrf'], S)
        forminfo = makeFormData(resurl['url'], forminfo)
        postmsg(resurl['url'].split('/')[-2], resurl['csrf'], forminfo, S)
        print('打卡成功,时间:' + times)

if __name__ == '__main__':
    r = ["liuxy1220","lxy159753456","1401","14","1220","420","510"]
    postMsg(r)
