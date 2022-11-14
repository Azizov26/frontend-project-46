#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --vers', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse();
// /home/azizov/Desktop/it/Projects/frontend-project-46/_fixtures_/file1.json
// /home/azizov/Desktop/it/Projects/frontend-project-46/_fixtures_/file2.json
