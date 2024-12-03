from utils import *
import string

f=open('day6.txt', 'r')
lines = [line.strip() for line in f.readlines()]

char_histograms = [{}, {}, {}, {}, {}, {}, {}, {}]

for line in lines:
  for i, c in enumerate(line):
    if c not in char_histograms[i]:
      char_histograms[i][c] = 0
    char_histograms[i][c] += 1

output = ''
print_json(char_histograms)
for hist in char_histograms:
  sorted_chars = sorted(hist.items(), key=lambda x: (x[1], x[0]))
  output += sorted_chars[0][0]


print(f"The common characters in the decoded messages are: {output}")
