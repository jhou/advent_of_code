from utils import *

f=open('day1.txt', 'r')
pairs = [line.strip() for line in f.readlines()]

left = []
right = []

for pair in pairs:
  left_number, right_number = map(int, pair.split("   "))
  left.append(left_number)
  right.append(right_number)

sorted_left = sorted(left)
sorted_right = sorted(right)

total_distance = 0
total_similarity = 0
for i in range(len(sorted_left)):
  # part 1
  distance = abs(sorted_left[i] - sorted_right[i])
  total_distance += distance

  # part 2
  cur_num = left[i]
  total_similarity += cur_num * right.count(cur_num)

print("Total distance:", total_distance)
print("Total similarity:", total_similarity)
