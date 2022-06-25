from PIL.Image import Dither  # noqa

from tools.utils import image2hex, load_test_image


if __name__ == '__main__':
    # print(image2hex(load_test_image('test-01.bmp')))

    print(image2hex(load_test_image('mao.bmp'), dither=Dither.FLOYDSTEINBERG))
    print(image2hex(load_test_image('car-sign.png'), dither=Dither.NONE))
