from utils import *
import string

f=open('day4.txt', 'r')
lines = [line.strip() for line in f.readlines()]

def parse_line(line):
  parts = line.split('-')
  last_parts = parts[-1].split('[')
  sector_id = int(last_parts[0])
  checksum = last_parts[1].replace(']', '')

  letter_counts = {}
  parts = parts[0:-1]
  for part in parts:
    for c in part:
      if c not in letter_counts:
        letter_counts[c] = 0
      letter_counts[c] += 1

  return {
    'name': parts,
    'sector_id': sector_id,
    'checksum': checksum,
    'letter_counts': letter_counts
  }

def calc_checksum(room):
  sorted_counts = sorted(room['letter_counts'].items(), key=lambda x: (-x[1], x[0]))
  expected_checksum = ''.join([c[0] for c in sorted_counts[:5]])
  return expected_checksum

def decode_name(room):
  abc = string.ascii_lowercase
  add_offset = room['sector_id']
  decoded = ''
  for part in room['name']:
    for c in part:
      if c.isalpha():
        decoded += abc[(abc.index(c) + add_offset) % 26]
      else:
        decoded += c
    decoded += '-'
  return decoded

# Parse the input lines into rooms, calculate checksums, and decode names
rooms = []
for line in lines:
  room = parse_line(line)
  room['expected_checksum'] = calc_checksum(room)
  room['decoded'] = decode_name(room)
  rooms.append(room)

total_ids = 0
for room in rooms:
  if room['expected_checksum'] == room['checksum']:
    total_ids += room['sector_id']
    print(room['decoded'], room['sector_id'])


print(f"Total sector IDs: {total_ids}")
