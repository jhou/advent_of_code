from utils import *


f=open('day11.txt', 'r')
input_numbers = list(map(int, f.readlines()[0].strip().split(' ')))

def zero_to_one(x):
  if x == 0:
    return 1

def split_even(x):
  x_str = str(x)
  if len(x_str) % 2 == 0:
    return int(x_str[:len(x_str)//2]), int(x_str[len(x_str)//2:])

def times_2024(x):
  return x * 2024

OPS = [zero_to_one, split_even, times_2024]

def process_stone(stone, stone_map):
  if stone in stone_map:
    return
  for op in OPS:
    output = op(stone)
    if output is None:
      continue
    if isinstance(output, tuple):
      stone_map[stone] = output
    else:
      stone_map[stone] = (output,)
    break

len_cache = {}
def calc_stone_length(stone_map, key, depth):
  if (key, depth) in len_cache:
    return len_cache[(key, depth)]
  length = None
  if depth == 0:
    length = len(stone_map[key])
  else:
    length = sum(calc_stone_length(stone_map, sub_stone, depth - 1) for sub_stone in stone_map[key])
  len_cache[(key, depth)] = length
  return length

def run_blinks(num_blinks):
  stone_map = {}
  for num in input_numbers:
    process_stone(num, stone_map)
  for i in range(num_blinks - 1):
    for stone_list in list(stone_map.values()):
      for stone in stone_list:
        process_stone(stone, stone_map)
  return sum([calc_stone_length(stone_map, num, num_blinks - 1) for num in input_numbers])

print(f"Part 1 - Total for 25 blinks: {run_blinks(25)}")
print(f"Part 1 - Total for 75 blinks: {run_blinks(75)}")

