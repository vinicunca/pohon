import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(process.env.POHON_SOURCE_ROOT ?? defaultRoot);
const output = resolve(root, process.argv[2] ?? 'docs/component-meta.json');
const requireFromDocs = createRequire(join(root, 'docs/package.json'));
const { createChecker } = requireFromDocs('vue-component-meta');
const checker = createChecker(join(root, 'tsconfig.json'));
const packageVersion = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const componentDir = join(root, 'src/runtime/components');
const components = {};

for (const file of readdirSync(componentDir).filter((name) => name.endsWith('.vue')).sort()) {
  const name = file.slice(0, -4);
  const meta = checker.getComponentMeta(join(componentDir, file));
  components[name] = {
    source: `src/runtime/components/${file}`,
    description: meta.description ?? '',
    props: meta.props.filter((item) => !item.global).map((item) => ({
      name: item.name,
      type: item.type,
      description: item.description,
      required: item.required,
      default: item.default,
    })),
    slots: meta.slots.map((item) => ({
      name: item.name,
      type: item.type,
      description: item.description,
    })),
    events: meta.events.map((item) => ({
      name: item.name,
      type: item.type,
      description: item.description,
    })),
  };
}

if (Object.keys(components).length < 100) {
  throw new Error(`Expected Pohon UI components, found ${Object.keys(components).length}`);
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify({ schemaVersion: 1, package: 'pohon', version: packageVersion, components }, null, 2)}\n`);
console.log(`Generated ${Object.keys(components).length} Pohon component metadata entries in ${output}`);
