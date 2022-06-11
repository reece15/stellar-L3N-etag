#pragma once

uint8_t EPD_BWR_290_detect(void);
uint8_t EPD_BWR_290_read_temp(void);
uint8_t EPD_BWR_290_Display(unsigned char *image, int size, uint8_t full_or_partial);
void EPD_BWR_290_set_sleep(void);