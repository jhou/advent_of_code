from utils import *
from structlinks.DataStructures import LinkedList

f=open('day11.txt', 'r')
numbers = list(map(int, f.readlines()[0].strip().split(' ')))
ll_numbers = LinkedList(numbers)

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
BLINKS = 25

for i in range(BLINKS):
  to_insert = []
  for idx in range(len(ll_numbers)):
    item = ll_numbers[idx]
    for op in OPS:
      output = op(item)
      if output is None:
        continue
      if isinstance(output, tuple):
        ll_numbers[idx] = output[0]
        to_insert.append((idx + 1, output[1]))
      else:
        ll_numbers[idx] = output
      break
  for idx, item in reversed(to_insert):
    ll_numbers.insert(idx, item)
  print(f"blink #{i}")

print(ll_numbers)
print(f"Part 1 - Total numbers: {len(ll_numbers)}")

