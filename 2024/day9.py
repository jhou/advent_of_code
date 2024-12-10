from utils import *
import copy

f=open('day9.txt', 'r')
disk_map = [int(i) for i in f.readlines()[0].strip()]

FREE_BLOCK = '.'

def find_next_used_block(disk_blocks, offset=None):
  start = len(disk_blocks) - 1 if offset is None else offset
  for idx in range(start, -1, -1):
    if disk_blocks[idx] != FREE_BLOCK:
      return idx
  raise("Could not find used block")

def find_next_free_block(disk_blocks, offset=None):
  start = 0 if offset is None else offset
  return disk_blocks.index(FREE_BLOCK, start)

def calc_checksum(disk_blocks):
  sum = 0
  for i, block in enumerate(disk_blocks):
    if block != FREE_BLOCK:
      sum += block * i
  return sum

def find_min_size_free_block(disk_blocks, size, stop_idx):
  for idx in range(disk_blocks.index(FREE_BLOCK), stop_idx):
    if disk_blocks[idx:idx + size] == ([FREE_BLOCK] * size):
      return idx
  return None

def swap_blocks(disk_blocks, file_idx, free_idx, size):
  file_copy = disk_blocks[file_idx:file_idx+size]
  disk_blocks[file_idx:file_idx+size] = [FREE_BLOCK] * size
  disk_blocks[free_idx:free_idx+size] = file_copy

### PREP WORK ###
# lots of pre-processing here make things easier
disk_blocks = [] # actual disk state, block by block
toggle = True # true for used blocks, false for free blocks
id_counter = 0 # IDs for the files inserted
used_blocks = 0 # total number of blocks actually used, and not free
file_pointers = [] # list of tuples: (pointers to the start of files, length of file in blocks)
for num_blocks in disk_map:
  block_content = id_counter if toggle else FREE_BLOCK
  if toggle:
    file_pointers.append((len(disk_blocks), num_blocks, id_counter))
  disk_blocks.extend([block_content] * num_blocks)
  if toggle:
    id_counter += 1
    used_blocks += num_blocks
  toggle = not toggle

part_2_blocks = copy.deepcopy(disk_blocks)

### PART 1 ###
# starts from the right
to_move_idx = find_next_used_block(disk_blocks)
# starts from the left
free_idx = find_next_free_block(disk_blocks)
while free_idx <= to_move_idx:
  used = disk_blocks[to_move_idx]
  disk_blocks[to_move_idx] = FREE_BLOCK
  disk_blocks[free_idx] = used
  to_move_idx = find_next_used_block(disk_blocks, to_move_idx - 1)
  free_idx = find_next_free_block(disk_blocks, free_idx + 1)

print(f"Part 1 Checksum: {calc_checksum(disk_blocks)}")

### PART 2 ###

for file_pointer, file_size, file_id in reversed(file_pointers):
  # find the smalles free block which will fit this file, then take the first one
  spot_idx = find_min_size_free_block(part_2_blocks, file_size, file_pointer)
  if spot_idx is None:
    continue
  # swap the file for the free block
  swap_blocks(part_2_blocks, file_pointer, spot_idx, file_size)

print(f"Part 2 Checksum: {calc_checksum(part_2_blocks)}")
