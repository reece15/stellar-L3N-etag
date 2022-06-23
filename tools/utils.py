import os

from PIL import Image


def hex2bytes(hex_string):
    return bytes([int(hex_string[index:index+2], 16) for index in range(0,len(hex_string), 2)])


def hex2bits(hex_string):
    _bytes = []
    for index in range(0, len(hex_string), 2):
        for char in hex_string[index:index+2]:
            for c in bin(int(char, 16))[2:].zfill(8):
                _bytes.append(int(c))

    return bytes(_bytes)


def bytes2hex(_bytes):
    return ''.join(hex(item)[2:].zfill(2) for item in _bytes)


def hex2image(hex_string, width, height):
    data = hex2bits(hex_string)
    image = Image.new('1', (width, height), (1))
    image.frombytes(data[:width*height], )

    image.show('test')


def image2hex(image, width=296, height=128):
    if isinstance(image, str):
        image = Image.open(image)

    return bytes2hex(image.resize((width, height)).rotate(90, expand=True).resize((height, width)).convert('1').tobytes())


def load_test_image(name):
    path = os.path.join(os.path.dirname(__file__), 'data', 'images', name)
    print(f'open image: {path}')
    return Image.open(path)
