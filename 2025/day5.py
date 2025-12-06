from utils import *

f=open('day5.txt', 'r')
ranges, ids = f.read().split('\n\n')
ranges = [list(map(int, x.split('-'))) for x in ranges.split('\n')]
ids = list(map(int, ids.split('\n')))

# part 1
total_fresh = 0
for id in ids:
  for id_range in ranges:
    if id >= id_range[0] and id <= id_range[1]:
      total_fresh += 1
      break

print("part 1: total fresh:", total_fresh)

# part 2
total_fresh = 0
ranges.sort(key=lambda x: x[0])
prev_start, prev_end = 0, 0
for id_range in ranges:
  start = id_range[0]
  end = id_range[1]
  if end <= prev_end:
    # skip this range - the end is less than the previous end
    print('skipping range', start, end, prev_start, prev_end)
    continue
  if start <= prev_end:
    start = prev_end + 1
  #print('start:', start, 'end:', end)
  total_fresh += end - start + 1
  prev_start = start
  prev_end = end

print("part 2: total fresh:", total_fresh)
