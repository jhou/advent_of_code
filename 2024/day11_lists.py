from utils import *

f=open('day11.txt', 'r')
numbers = list(map(int, f.readlines()[0].strip().split(' ')))

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
BLINKS = 75

for i in range(BLINKS):
  new_numbers = []
  for idx, item in enumerate(numbers):
    for op in OPS:
      output = op(item)
      if output is None:
        continue
      if isinstance(output, tuple):
        new_numbers.extend(output)
      else:
        new_numbers.append(output)
      break
  numbers = new_numbers
  print(f"blink #{i}")

# print(numbers)
print(f"Part 1 - Total numbers: {len(numbers)}")

