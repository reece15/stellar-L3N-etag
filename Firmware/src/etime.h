#pragma once

typedef enum
{
    Timer_CH_0 = 0,
    Timer_CH_1,
    Timer_CH_2,
    Timer_CH_3,
    Timer_CH_4,
    Timer_CH_5,
    Timer_CH_6,
    Timer_CH_7,
    Timer_CH_8,
    Timer_CH_9,
} timer_channel;

struct date_time
{
  int	tm_sec;
  int	tm_min;
  int	tm_hour;
  int	tm_day;
  int	tm_month;
  int	tm_year;
  int	tm_week;
};

void init_time(void);
void handler_time(void);
uint8_t time_reached_period(timer_channel ch, uint32_t seconds);
void set_time(uint32_t time_now, uint16_t time_year, uint8_t time_month, uint8_t time_day, uint8_t time_week);
struct date_time get_time(void);