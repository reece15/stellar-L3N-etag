#pragma once

#define epd_height 128
#define epd_width 296
#define epd_buffer_size ((epd_height/8) * epd_width)

void set_EPD_model(uint8_t model_nr);
void set_EPD_scene(uint8_t scene);

void init_epd(void);
uint8_t EPD_read_temp(void);
void EPD_Display(unsigned char *image, int size, uint8_t full_or_partial);
void epd_display_tiff(uint8_t *pData, int iSize);
void epd_set_sleep(void);
uint8_t epd_state_handler(void);
void epd_display_char(uint8_t data);
void epd_clear(void);

void update_time_scene(uint32_t _time, uint16_t battery_mv, int16_t temperature, void (*scene)(uint32_t, uint16_t, int16_t,  uint8_t));
void epd_update(uint32_t _time, uint16_t battery_mv, int16_t temperature);

void epd_display(uint32_t _time, uint16_t battery_mv, int16_t temperature, uint8_t full_or_partial);
void epd_display_time_with_date(uint32_t _time, uint16_t battery_mv, int16_t temperature, uint8_t full_or_partial);
