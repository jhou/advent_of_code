from utils import *
from itertools import combinations as combo

f=open('day3.txt', 'r')
# banks = [list(map(int, line.strip())) for line in f.readlines()]
banks = [line.strip() for line in f.readlines()]

joltage_total = 0

# part 1
for bank in banks:
  max_joltage = 0
  for i in range(len(bank) - 1):
    for j in range(i+1, len(bank)):
      max_joltage = max(max_joltage, int(bank[i] + bank[j]))

  joltage_total += max_joltage

print("part 1: joltage total:", joltage_total)

# joltage_total = 0
# for bank in banks:
#   max_joltage = 0
  
#   for combo in itertools.combinations(bank, 12):
#     max_joltage = max(max_joltage, int(''.join(combo)))
#   joltage_total += max_joltage

# joltage_total = 0
# for bank in banks:
#   maxes = [0] * 12

#   digits_with_indexes = [(digit, i) for i, digit in enumerate(bank)]
#   digits_with_indexes.sort(key=lambda x: x, reverse=True)
#   print('sorted:', digits_with_indexes)
#   digits_with_indexes = digits_with_indexes[:12]
#   print('12 digits:', digits_with_indexes)
#   digits_with_indexes.sort(key=lambda x: (x[1], x[0]))
#   print('re-sorted:', digits_with_indexes)
#   joltage_digits = [x[0] for x in digits_with_indexes]
#   joltage = int(''.join(joltage_digits))
#   joltage_total += joltage
#   print('bank:', bank, 'joltage:', joltage)

joltage_total = 0
for bank in banks:
  # Start with the first 12 characters
  current_chars = bank[:12]
  max_val = int(current_chars)
  
  # Iterate through the rest of the characters
  for next_char in bank[12:]:
    # Create a pool of 13 characters (current 12 + next one)
    pool = current_chars + next_char
    
    # Generate all combinations of 12 characters from the pool of 13
    best_combo_val = -1
    best_combo_str = ""
    
    for c in combo(pool, 12):
      c_str = "".join(c)
      c_val = int(c_str)
      if c_val > max_val:
        max_val = c_val
        current_chars = c_str

  joltage_total += max_val

print("part 2: joltage total:", joltage_total)
