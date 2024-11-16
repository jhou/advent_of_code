from utils import *

f=open('day1.txt', 'r')
instructions = f.readlines()[0]
instructions = [x.strip() for x in instructions.split(',')]


location = [0, 0]
visited_locations = set()
direction = 0 # north

def move(direction, distance = 1):
  if direction == 0:
    location[0] = location[0] + distance
  elif direction == 1:
    location[1] = location[1] + distance
  elif direction == 2:
    location[0] = location[0] - distance
  elif direction == 3:
    location[1] = location[1] - distance
  else:
    print("Invalid direction!")

found_dupe = False
for inst in instructions:
  rotation = inst[0]
  distance = int(inst[1:])
  if rotation == 'R':
    direction = (direction + 1) % 4
  elif rotation == 'L':
    direction = (direction - 1) % 4
  while (distance > 0):
    print(f"Start Location: {location}, direction: {direction}, distance: {distance}")
    move(direction)
    distance -= 1
    prev_len = len(visited_locations)
    visited_locations.add(tuple(location))
    next_len = len(visited_locations)
    if (prev_len == next_len):
        found_dupe = True
        break
  print(f"End Location: {location}")
  if found_dupe:
      break


print_json(location)
print(f"final distance: {abs(location[0]) + abs(location[1])}")
