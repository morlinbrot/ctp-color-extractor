import {
  CatppuccinFlavor,
  ColorFormat,
  ColorName,
  flavorEntries,
} from "https://deno.land/x/catppuccin/mod.ts";

const FILE_EXT = "toml";
const OUT_DIR = "out";

const toTomlString = ([colorName, { hex }]: [ColorName, ColorFormat]) => {
  return `${colorName} = '${hex}'`;
};

export const flavorToPalette = (flavor: CatppuccinFlavor) => {
  let str = "[palette]\n";

  flavor.colorEntries.forEach((entry) => {
    str = str.concat(`  ${toTomlString(entry)}\n`);
  });

  return str;
};

flavorEntries.forEach(([_, flavor]) => {
  const filename = `${OUT_DIR}/Catppuccin_${flavor.name}.${FILE_EXT}`;

  const header =
    `# Catppuccin ${flavor.name} color scheme, extracted from https://github.com/catppuccin/palette with the catppuccin-color-extractor tool.\n\n`;

  const content = header.concat(flavorToPalette(flavor));

  Deno.writeTextFileSync(filename, content);

  console.info(`Wrote '${filename}'.`);
});
