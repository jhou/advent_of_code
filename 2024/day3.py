import re
from utils import *

f=open('day3.txt', 'r')
lines = [l.strip() for l in f.readlines()]

instructions = []
for line in lines:
  instructions.extend(re.findall(r'mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don\'t\(\)', line))

part1_total = 0
part2_total = 0
part2_switch = True
for instruction in instructions:
  if instruction == 'do()':
    part2_switch = True
    continue
  elif instruction == 'don\'t()':
    part2_switch = False
    continue

  a, b = map(int, instruction[4:-1].split(','))
  part1_total += a * b
  if part2_switch:
    part2_total += a * b

print("Total of multiplications for Part 1:", part1_total)
print("Total of multiplications for Part 2:", part2_total)


