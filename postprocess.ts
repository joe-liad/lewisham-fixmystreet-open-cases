const records = await Deno.readTextFile('fixmystreet-open-cases.json');

const data:object[] = JSON.parse(records).service_requests
const header:string[] = Object.keys(data[0]).filter(el => el !== 'agency_responsible')

// CONVERT TO CSV
import {exists} from "https://deno.land/std/fs/mod.ts";
const filename = "fixmystreet-open-cases.csv"
exists(filename).then((result) => Deno.truncate(filename));
import {CsvFile} from "https://deno.land/x/csv_file/mod.ts";
let csv = new CsvFile(await Deno.open(filename, {read: true, write: true, create: true, truncate: true}));
await csv.writeRecord(header.map(el => String(el)))
for (const el of data) {
    await csv.writeRecord(Object.values(el).map(el => String(el)))
}
csv.close();
