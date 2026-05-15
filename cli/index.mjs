#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import make from './commands/make/index.mjs';

const main = defineCommand({
  meta: {
    name: 'pohon-ui',
    description: 'Pohon UI CLI',
  },
  subCommands: {
    make,
  },
});

runMain(main);
