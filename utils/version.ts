const input = Bun.file('package.json');
const contents = await input.json();

// バージョンを表示
console.log('version: ', contents.version);

// 書き込み
const output = Bun.file('./public/version')
await Bun.write(output, contents.version)