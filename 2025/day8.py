from utils import *
from itertools import combinations as combos

f=open('day8.txt', 'r')
  
points = [tuple(map(int, line.split(','))) for line in f.readlines()]
import math

def straight_line_distance(point1, point2):
    x1, y1, z1 = point1
    x2, y2, z2 = point2
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2)

# part 1
point_pairs = combos(points, 2)
distances = []
for idx, (p1, p2) in enumerate(point_pairs):
    #print(idx, p1, p2)
    distances.append(((p1, p2), straight_line_distance(p1, p2)))
distances.sort(key=lambda x: x[1])

circuits = [[point] for point in points]
part1_circuits = []
for idx, (cur_points, dist) in enumerate(distances):
    p1, p2 = cur_points
    p1_circuit_idx, p2_circuit_idx = None, None
    for circuit_idx, circuit in enumerate(circuits):
        if p1 in circuit:
            p1_circuit_idx = circuit_idx
        if p2 in circuit:
            p2_circuit_idx = circuit_idx
    if p1_circuit_idx is not None and p2_circuit_idx is None:
        circuits[p1_circuit_idx].append(p2)
    elif p1_circuit_idx is None and p2_circuit_idx is not None:
        circuits[p2_circuit_idx].append(p1)
    elif p1_circuit_idx is not None and p2_circuit_idx is not None and p1_circuit_idx != p2_circuit_idx:
        circuits[p1_circuit_idx].extend(circuits[p2_circuit_idx])
        circuits.pop(p2_circuit_idx)
        if len(circuits) == 1 and len(circuits[0]) == len(points):
            # part 2
            print('part 2: found complete circuit p1x * p2x', p1[0]*p2[0])
            break
    if idx == 999:
        import copy
        part1_circuits = copy.deepcopy(circuits)
        # break

# part 1
part1_circuits.sort(key=lambda x: len(x), reverse=True)
print('part 1: top 3 circuits', len(part1_circuits[0]), len(part1_circuits[1]), len(part1_circuits[2]), len(part1_circuits[0])*len(part1_circuits[1])*len(part1_circuits[2]))


    
