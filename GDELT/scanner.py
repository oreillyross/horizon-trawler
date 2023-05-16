from io import BytesIO
import io
import requests, zipfile

def downloadLatestGDELTSources(url):
    
    response = requests.get(url)

    data = response.text
    lines = data.split("\n")

    labels = ["id", "uid", "url"]
    sources = []
    for line in lines:
        source = dict(zip(labels, line.split(" ")))
        sources.append(source)
    for i in range(3):
        r = requests.get(sources[i]["url"], stream=True)
        z = zipfile.ZipFile(BytesIO(r.content))
        z.extractall(".")