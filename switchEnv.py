# Powershell: ls -r | ForEach-Object { echo $_.Name }
# Bash: find app/ -iname "*.ts*"

# First attempt:
# find app/ -iname "*.ts*" | xargs -I {} sed -in 's/\(.*import.*\)/\/\/ \1/g' {}
# but it becomes more difficult to detect whether there are commented lines or not, and then run different substitution rules
# it's possible with sed, but it's easier with python

import os
import re
import sys

import in_place

if ( (len(sys.argv) != 2) or ( (sys.argv[1] != "local") and (sys.argv[1] != "remote")) ):
	print(f"Usage: {sys.argv[0]} [local | remote]")
	print(f"{sys.argv[0]} local: comments out queries.ts imports and uncomments queries_local.ts imports")
	print(f"{sys.argv[0]} remote: comments out queries_local.ts imports and uncomments queries.ts imports")
	print(f"Run {sys.argv[0]} remote before running git push")
	sys.exit(-1)

goingToRemote = (sys.argv[1] == "remote")
goingToLocal = (sys.argv[1] == "local")

DEBUG = False
def debugPrint(*args):
	if DEBUG:
		for a in args:
			print(a, end=" ")
		print("\n", end="")

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

def findPaths(directory, dirChain, regex):
	for d in os.listdir(directory):
		realAbsPath = os.path.normpath(dirChain + "\\" + d)
		match = re.match(regex, realAbsPath)

		if (not os.path.isdir(realAbsPath) and match):
			paths.append(realAbsPath)

		if (os.path.isdir(realAbsPath)):
			findPaths(realAbsPath, dirChain+"\\"+d, regex)

paths = []
srcdir = "app"
findPaths(srcdir, srcdir, r"[a-zA-Z\\\[\]\.]*.ts(x?)")

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

def isRemoteImport(line):
	return ("local" not in line) and (("actions" in line) or ("queries" in line))

def isLocalImport(line):
	return ("actions_local" in line) or ("queries_local" in line)

def switchFile(filename):
	importRe = r"(?P<isCommented>(// )?)import [a-zA-Z0-9.{}\-;]*"

	# if it's not properly commented, the results will be sub-par
	# so make sure to always have the local and remote imports properly commented if you add new ones
	with in_place.InPlace(filename) as f:
		debugPrint("--->", f.name)
		for line in f:

			lineMatch = re.match(importRe, line)
			
			if (lineMatch):
				lineIsCommented = lineMatch.group('isCommented') != ''
				debugPrint("lineMatch.group('isCommented') == [[", lineMatch.group('isCommented'), "]]")
				if (isRemoteImport(line)):
					debugPrint(line)

					if (goingToLocal):
						if (not lineIsCommented):
							f.write("// " + line)
						else:
							f.write(line)

					elif (goingToRemote):
						if (lineIsCommented):
							f.write(line[3:])
						else:
							f.write(line)

				elif (isLocalImport(line)):
					debugPrint(line)

					if (goingToRemote):
						if (not lineIsCommented):
							f.write("// " + line)
						else:
							f.write(line)
					elif (goingToLocal):
						if (lineIsCommented):
							f.write(line[3:])
						else:
							f.write(line)
			else:
				# write all other lines to file
				f.write(line)
	debugPrint("~~~~~~~~~~~~~~~")

if __name__ == '__main__':
	for f in paths:
		debugPrint("going to call switchFile on", f)
		switchFile(f)

	# TODO:
	# git pre-push hooks?
	# https://github.com/git/git/blob/87c86dd14abe8db7d00b0df5661ef8cf147a72a3/templates/hooks--pre-push.sample
	# or put <<< alias push="npm run remoteDB; git push;" >>> on your .bashrc
	print(f"Remember to run {sys.argv[1]} remote before running git push")