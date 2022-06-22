## hanshow stellar L3N 电子价签固件


### 刷入固件步骤
- 1. 拆开电池后盖观察主板是否是如下图所示。（或者查看主控是否为TLSR8359）

![焊接图示](/USB_UART_Flashing_connection.jpg)

- 2. 焊接 GND, VCC, RX, RTS四根线。 RTS 可不焊。
- 3. 使用usb2ttl模块(CH340)链接焊接的四根线。其中rx 链接 tx, tx链接 rx, vcc链接3.3v, GND链接 GND
- 4. 打开https://atc1441.github.io/ATC_TLSR_Paper_UART_Flasher.html， 波特率选择默认 460800，Atime默认，文件选择Firmware/ATC_Paper.bin
- 5. 先点击unlock,再点击write to flush,等待完成。成功后，屏幕会自动刷新。

### 项目编译

```cmd

    cd Firmware
    makeit.exe clean && makeit.exe -j12

```

成功后提示内容:

```
'Create Flash image (binary format)'
'Invoking: TC32 Create Extended Listing'
'Invoking: Print Size'
"tc32_windows\\bin\\"tc32-elf-size -t ./out/ATC_Paper.elf
copy from `./out/ATC_Paper.elf' [elf32-littletc32] to `./out/../ATC_Paper.bin' [binary]
   text    data     bss     dec     hex filename
  75608    4604   25341  105553   19c51 ./out/ATC_Paper.elf
  75608    4604   25341  105553   19c51 (TOTALS)
'Finished building: sizedummy'
' '
tl_fireware_tools.py v0.1 dev
Firmware CRC32: 0xe62d501e
'Finished building: out/../ATC_Paper.bin'
' '
'Finished building: out/ATC_Paper.lst'
' '
```

### 蓝牙链接和OTA升级
- 1. 必须先断开TTL TX线，不然蓝牙链接不上。
- 2. OTA升级： https://atc1441.github.io/ATC_TLSR_Paper_OTA_writing.html

### 上传图片
- 1. 运行 `cd web_tools && python -m http.server`
- 2. 打开 http://127.0.0.1:8000 后在页面上链接蓝牙
- 3. 使用 tools/scripts/image2hex.py 生成图片的16进制字符串，复制到上面页面的输入框里
- 4. 发送到设备，等待屏幕刷新


### 已解决/未解决问题
- [x] 编译报错
- [x] 刷入不生效
- [x] 屏幕区域不对/异常
- [x] 蓝牙无法链接/蓝牙OTA升级
- [ ] 自动识别型号
- [x] python 图片生成脚本
- [x] 蓝牙发送图片, 显示大小不对问题解决
- [x] 添加蓝牙上传图片后notify

### 计划新增
- [ ] 安卓端控制器
    - [ ] 更新图片
    - [ ] 修改设置
    - [ ] 模板库
        - [ ] 静态图片
        - [ ] 文字模板
        - [ ] 电子价签模板
        - [ ] 停车牌
        - [ ] 日历/时钟/温度计
        - [ ]
- [ ] 按键控制器
    - [ ] 外壳3D建模
- [ ] 2.4G RF通信

### 原始readme.md

[README_EN.md](/README_en.md)