from utils import *
from itertools import combinations

f=open('day8.txt', 'r')
grid = [list(l.strip()) for l in f.readlines()]

def in_grid(point):
  return 0 <= point[0] < len(grid) and 0 <= point[1] < len(grid[0])
def add_points(point_a, point_b):
  return (point_a[0] + point_b[0], point_a[1] + point_b[1])
def subtract_points(point_a, point_b):
  return (point_a[0] - point_b[0], point_a[1] - point_b[1])

def calc_antinodes(point_a, point_b, part2=False):
  all_antinodes = []
  distance = subtract_points(point_a, point_b)
  antinode = add_points(point_a, distance)
  if in_grid(antinode):
    all_antinodes.append(antinode)
  if part2:
    while in_grid(antinode):
      all_antinodes.append(antinode)
      antinode = add_points(antinode, distance)
  return all_antinodes

### Gather info about the antennas
antennas = {}
for row_idx, row in enumerate(grid):
  for col_idx, char in enumerate(row):
    if char != '.':
      if char not in antennas:
        antennas[char] = []
      antennas[char].append((row_idx, col_idx))

### Part 1
valid_antinodes = []
for node_char, locations in antennas.items():
  combos = combinations(locations, 2)
  for node_a, node_b in combos:
    valid_antinodes.extend(calc_antinodes(node_a, node_b))
    valid_antinodes.extend(calc_antinodes(node_b, node_a))

### Part 2
harmonic_antinodes = []
for node_char, locations in antennas.items():
  combos = combinations(locations, 2)
  for node_a, node_b in combos:
    harmonic_antinodes.append(node_a)
    harmonic_antinodes.append(node_b)
    # first direction
    harmonic_antinodes.extend(calc_antinodes(node_a, node_b, True))
    # second direction
    harmonic_antinodes.extend(calc_antinodes(node_b, node_a, True))

unique_antinodes = set(valid_antinodes)
print(f"Unique Antinodes: {len(unique_antinodes)}")
unique_harmonic_antinodes = set(harmonic_antinodes)
print(f"Unique Harmonic Antinodes: {len(unique_harmonic_antinodes)}")
