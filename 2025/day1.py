from utils import *

f=open('day1.txt', 'r')
rotations = [line.strip() for line in f.readlines()]

def rotate(current_postition, direction):
  if direction == "L":
    return (current_postition - 1) % 100
  else:
    return (current_postition + 1) % 100

prev = None
current = 50
num_zeroes = 0
num_zero_passes = 0

for rotation in rotations:
  direction = rotation[0]
  clicks = int(rotation[1:])
  while clicks > 0:
    current = rotate(current, direction)
    clicks -= 1
    if current == 0:
      num_zero_passes += 1
      print("zero pass at", rotation)
  if current == 0:
    num_zeroes += 1
    print("zero at", rotation)

# part 1
print("part 1: num_zeroes:", num_zeroes)
print("part 2: num_zero_passes:", num_zero_passes)
