# Real Random Forest
# 23333

#!/usr/bin/python
# -*- coding: UTF-8 -*-

import random
import numpy as np
# Demo region
def RandomTree(x1_in, z1_in, x2_in, z2_in, y_in, intensity):
	scale_base = 0.30;
	ybase 	= y_in
	xpoint 	= x1_in
	zpoint 	= z1_in
	width 	= x2_in - x1_in
	length	= z2_in - z1_in
	dist = intensity
	# Initilization
	(x1, y1, z1) = (xpoint, ybase, zpoint) 
	(x2, y2, z2) = (xpoint + width, ybase, zpoint)
	(x3, y3, z3) = (xpoint + width, ybase, zpoint + length)
	(x4, y4, z4) = (xpoint, ybase, zpoint + length)
	# Transform
	mx1 = (x1/dist+1, x1/dist)[x1%dist==0]
	mz1 = (z1/dist+1, z1/dist)[z1%dist==0]
	mx2 = x2/dist
	mz2 = (z2/dist+1, z2/dist)[z2%dist==0]
	mx3 = x3/dist
	mz3 = z3/dist
	mx4 = (x4/dist+1, x4/dist)[x4%dist==0]
	mz4 = z4/dist

	# Mapping
	MapWidth = int(mx2 - mx1 + 1)
	MapLength = int(mz4 - mz1 + 1)
	Map = np.zeros((MapWidth, MapLength))

	# Points
	Map[0][0] = 1
	Map[MapWidth-1][0] = 1
	Map[MapWidth-1][MapLength-1] = 1
	Map[0][MapLength-1] = 1

	# Pick one
	Map[random.randint(0, MapWidth-1)][random.randint(0, MapLength-1)] = 1

	# Start
	def IsValid(x, z):
		if x < 0 or x > MapWidth-1 or z < 0 or z > MapLength-1:
			return False
		if (x - 1) >= 0:
			if Map[x - 1][z] > 0:
				return False

		if (x + 1) <= MapWidth - 1:
			if Map[x + 1][z] > 0:
				return False

		if (z - 1) >= 0:
			if Map[x][z - 1] > 0:
				return False

		if (z + 1) <= MapLength - 1:
			if Map[x][z + 1] > 0:
				return False
		
		return True

	threshold = 0.4
	for i in range(MapWidth):
		for j in range(MapLength):
			if(IsValid(i, j)):
				Map[i][j] = random.random()
				if(Map[i][j] >= threshold):
					print ("[", end="")
					print (random.randint(0, 4), end=""), 
					print (", [", end=""),
					print (x1 + i*dist - 1.5 + random.random()*3, end="")
					print (",", end="")
					print (ybase, end="")
					print (",", end="")
					print (z1 + j*dist - 1.5 + random.random()*3, end="")
					print ("], [", end="")
					print (scale_base - 0.025 + random.random()*0.05, end="")
					print (",", end="")
					print (scale_base - 0.025 + random.random()*0.05, end="")
					print (",", end="")
					print (scale_base - 0.025 + random.random()*0.05, end="")
					print ("], Math.PI*", end="")
					print (random.random(), end="")
					print ("],")

RandomTree(35, 220, 110, 260, 125, 6)


