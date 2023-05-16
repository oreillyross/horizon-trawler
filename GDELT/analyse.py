import downloadLatestGDELTSources

gdelt_lastupdate_page = "http://data.gdeltproject.org/gdeltv2/lastupdate.txt"
downloadLatestGDELTSources(gdelt_lastupdate_page)

import csv
from itertools import islice
# with open("20230516093000.export.CSV") as f:
#     gkg = csv.reader(f, delimiter="\t")
#     for row in islice(gkg, 1):
#         print(row)
with open("20230516093000.gkg.CSV", 'r') as f:
    gkg = csv.reader(f, delimiter="\t")
    sources = {}
    for row in islice(gkg, 5):
        for i in range(len(row)):
            print(row[i] + '\n')
#         sources[row[3]] = sources.get(row[4], 0) + 1
#     print(sources)
