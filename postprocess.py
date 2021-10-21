# currently unused in favour of deno
import pandas as pd
import json

with open("fixmystreet-open-cases.json", "r") as f:
    data = json.loads(f.read())
    df = pd.json_normalize(data["service_requests"])
    df.to_csv(r"./fixmystreet-open-cases.csv", index=False, header=True)
