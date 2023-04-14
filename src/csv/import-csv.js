import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('tasks.csv', import.meta.url);

async function readCsv() {
  fs.createReadStream(csvPath)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row) {
    const [title, description] = row;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    });
  });

}

readCsv();