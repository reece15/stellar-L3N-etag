#pragma once

#include <stdbool.h>
#include <stdint.h>

void init_ble(void);
void set_adv_data(int16_t temp, uint8_t battery_level, uint16_t battery_mv);
void set_air_tag_adv_data(void); // 发送 airtag 广播
bool ble_get_connected(void);
bool ble_get_ota_started(void);
void ble_send_temp(int16_t temp);
void ble_send_battery(uint8_t value);
void blt_pm_proc(void);

int RxTxWrite(void *p);
int otaWritePre(void *p);
void ble_set_connection_speed(uint16_t speed);
