from utils import *

f=open('day2.txt', 'r')
ranges = [list(map(int, part.split('-'))) for part in f.read().split(',')]

def is_valid(number):
  str_number = str(number)
  length = len(str_number)
  for i in range(1, (length // 2) + 1):
    part = str_number[:i]
    multi_part = part * (length // len(part))
    # print('number', number, 'part', part, 'multi_part', multi_part)
    if multi_part == str_number:
      return False
  return True

total_invalid = 0

for num_range in ranges:
  for num in range(num_range[0], num_range[1]+1):
    if not is_valid(num):
      total_invalid += num
  

# part 1
print("part 1: total invalid:", total_invalid)
