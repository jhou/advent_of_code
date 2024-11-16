from utils import *

f=open('day3.txt', 'r')

def process_line(l):
  out = []
  for i in l:
    if i.strip() != '':
      out.append(int(i))
  return out

triangles = [
  process_line(line.strip().split(' '))
  for line
  in f.readlines()
]

triangles2 = []
idx = 0
while idx < len(triangles):
  triangles2.append([triangles[idx][0], triangles[idx + 1][0], triangles[idx + 2][0]])
  triangles2.append([triangles[idx][1], triangles[idx + 1][1], triangles[idx + 2][1]])
  triangles2.append([triangles[idx][2], triangles[idx + 1][2], triangles[idx + 2][2]])
  idx += 3

def count_triangles(tris):
  num_triangles = 0
  for t in tris:
    sorted_t = sorted(t)
    if (sorted_t[0] + sorted_t[1] > sorted_t[2]):
      num_triangles += 1
  return num_triangles

print(f"valid triangles 1: {count_triangles(triangles)}")
print(f"valid triangles 2: {count_triangles(triangles2)}")
