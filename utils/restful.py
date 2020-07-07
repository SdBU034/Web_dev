# encoding = utf-8
from django.http import JsonResponse


class HttpCode:
    ok = 200
    params_error = 400
    auth_error = 401
    method_error = 405
    server_error = 500


def result(code=HttpCode.ok, message='', data=None, kwargs=None):
    json_dict = {'code': code, 'message': message, 'data': data}

    if kwargs and isinstance(kwargs, dict) and kwargs.keys():
        json_dict.update(kwargs)
    return JsonResponse(json_dict)


def ok():
    return result()


def params_error(message='', data=None):
    return result(code=HttpCode.params_error, message=message, data=data)


def auth_error(message='', data=None):
    return result(code=HttpCode.auth_error, message=message, data=data)


def method_error(message='', data=None):
    return result(code=HttpCode.method_error, message=message, data=data)


def server_error(message='', data=None):
    return result(code=HttpCode.server_error, message=message, data=data)