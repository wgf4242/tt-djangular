from werobot import WeRoBot

robot = WeRoBot(enable_session=False,
                token='weixin',
                APP_ID='wxd5f96836070dc75c',
                APP_SECRET='fb5d87169c5ebc8b355cb6322e771627')

@robot.handler
def hello(message):
    return 'Hello world'
