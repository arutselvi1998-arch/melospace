import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const names=['workshop','craft','dress','celebration','room','photo','meetup','wellness','crochet'];
const base=process.env.MELO_TEST_URL||'http://127.0.0.1:3001';
const result=[];
for(const name of names){
  const local=await readFile(new URL(`../assets/melo/${name}-hd.png`,import.meta.url));
  assert.equal(local.toString('hex',0,8),'89504e470d0a1a0a',`${name}: PNG format`);
  const width=local.readUInt32BE(16),height=local.readUInt32BE(20);
  assert.ok(width>=1024&&height>=640,`${name}: enough pixels for high-density cards`);
  for(const suffix of ['', '-hd']){
    const response=await fetch(`${base}/assets/melo/${name}${suffix}.png`,{signal:AbortSignal.timeout(5000)});
    assert.equal(response.status,200,`${name}${suffix}: HTTP success`);
    assert.equal(response.headers.get('cache-control'),'no-store');
    const served=Buffer.from(await response.arrayBuffer());
    assert.ok(local.equals(served),`${name}${suffix}: serves the high-resolution file`);
  }
  result.push({name,width,height,bytes:local.length});
  console.log(`${name}: ${width} × ${height}, both image URLs verified`);
}
await mkdir(new URL('../test-artifacts/',import.meta.url),{recursive:true});
await writeFile(new URL('../test-artifacts/artwork-resolution.json',import.meta.url),JSON.stringify(result,null,2));
