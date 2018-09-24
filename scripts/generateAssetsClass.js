const dirTree = require('directory-tree');
const shell = require("shelljs");
const fs = require("fs");

const assetsClassFile = 'src/assets.ts';

tree = dirTree('./assets/', {
  normalizePath: true,
  extensions: /\.json|xml|png|jpg|jpeg|mp3|ogg$/
});

const toCamelCase = (string) => string.replace(/[^A-Za-z0-9]/g, ' ').replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) => {
  if (+match === 0 || match === '-' || match === '.') {
    return '';
  }
  return index === 0 ? match.toLowerCase() : match.toUpperCase();
});

const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase[0].toUpperCase() + camelCase.substr(1);
};

const handleAssetTree = (node, extension, extensionPair) => {
  if (node.type === 'directory') {
    if (node.children.length === 0) {
      console.warn('\x1b[33m%s\x1b[0m', `Warning!!!\nEmpty directory ${node.path}`);
    } else {
      shell.ShellString(`\nexport namespace  ${toPascalCase(node.name)} {`).toEnd(assetsClassFile);

      node.children.forEach(childNode => handleAssetTree(childNode, extension, extensionPair));

      shell.ShellString(`\n}`).toEnd(assetsClassFile);
    }
  } else {
    if (node.extension === `.${extension}`) {
      const name = node.name.substring(0, node.name.indexOf('.'));
      shell.ShellString('\nexport class ' + toPascalCase(name) + ' {').toEnd(assetsClassFile);
      shell.ShellString(`\npublic static Name: string =  '${name}'`).toEnd(assetsClassFile);

      shell.ShellString(`\npublic static ${toPascalCase(extension + 'URL') }: string =  '${node.path}'`).toEnd(assetsClassFile);

      const pairPath = node.path.replace(extension, extensionPair);

      if (fs.existsSync(pairPath)) {
        shell.ShellString(`\npublic static ${toPascalCase(extensionPair + 'URL')}: string =  '${pairPath}'`).toEnd(assetsClassFile);
      } else {
        shell.ShellString(`\n/* missing source pair */`).toEnd(assetsClassFile);
        shell.ShellString(`\n/* public static ${toPascalCase(extensionPair + 'URL')}: string =  '${pairPath}'*/`).toEnd(assetsClassFile);
        console.warn('\x1b[33m%s\x1b[0m', `Warning!!!\nFile pair ${name}.${extensionPair} for  ${name}.${extension} is missing`);
      }
      shell.ShellString(`\n}`).toEnd(assetsClassFile);
    }
  }
}

const handleAtlasesTree = (node) => {
  if (node.type === 'directory') {
    if (node.children.length === 0) {
      console.warn('\x1b[33m%s\x1b[0m', `Warning!!!\nEmpty directory ${node.path}`);
    } else {
      shell.ShellString(`\nexport namespace  ${toPascalCase(node.name)} {`).toEnd(assetsClassFile);
      node.children.forEach(childNode => handleAtlasesTree(childNode));
      shell.ShellString(`\n}`).toEnd(assetsClassFile);
    }
  } else {
    if (node.extension === ".json") {
      try {
        const fileData = fs.readFileSync(node.path, 'ascii');
        const json = JSON.parse(fileData);

        const name = node.name.substring(0, node.name.indexOf('.'));

        shell.ShellString(`\nexport namespace  ${toPascalCase(name)} {`).toEnd(assetsClassFile);
        shell.ShellString('\nexport class ' + toPascalCase('atlas') + ' {').toEnd(assetsClassFile);
        shell.ShellString(`\npublic static Name: string =  '${name}'`).toEnd(assetsClassFile);
        shell.ShellString(`\npublic static AtlasURL: string =  '${node.path}'`).toEnd(assetsClassFile);
        shell.ShellString(`\npublic static TextureURL: string =  '${node.path.replace('json', 'png')}'`).toEnd(assetsClassFile);

        shell.ShellString(`\n}`).toEnd(assetsClassFile);

        shell.ShellString(`\nexport namespace  Atlas {`).toEnd(assetsClassFile);
        shell.ShellString(`\nexport enum Frames {`).toEnd(assetsClassFile);

        for (let frame in json['frames']) {
          frameFull = (json['frames'][frame]['filename']);
          indexOfExtension = frameFull.lastIndexOf('.');
          frame = indexOfExtension === -1 ? frameFull : frameFull.substring(0, indexOfExtension);
          shell.ShellString(`\n ${toPascalCase(frame)} = '${frameFull}',`).toEnd(assetsClassFile);

        }

        shell.ShellString(`\n}`).toEnd(assetsClassFile);
        shell.ShellString(`\n}`).toEnd(assetsClassFile);
        shell.ShellString(`\n}`).toEnd(assetsClassFile);

      } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', `Atlas Data File Error: ${e}`);
      }
    }
  }
}

const loopTree = (node) => {
  if (node.children !== void 0) {
    if (node.name.toLowerCase() === 'atlases') {
      handleAtlasesTree(node);
    } else if (node.name.toLowerCase() === 'bitmapfonts') {
      handleAssetTree(node, 'xml', 'png')
    } else if (node.name.toLowerCase() === 'audios') {
      handleAssetTree(node, 'mp3', 'ogg')
    } else {
      shell.ShellString(`\nexport namespace ${toPascalCase(node.name)} {`).toEnd(assetsClassFile);
      node.children.forEach(child => loopTree(child));
      shell.ShellString('\n}').toEnd(assetsClassFile);
    }
  } else {
    const name = node.name.substring(0, node.name.indexOf('.'));
    shell.ShellString('\nexport class ' + toPascalCase(name) + ' {').toEnd(assetsClassFile);
    shell.ShellString(`\npublic static Name: string =  '${name}'`).toEnd(assetsClassFile);
    shell.ShellString(`\npublic static FileURL: string =  '${node.path}'`).toEnd(assetsClassFile);
    shell.ShellString(`\npublic static Extension: string =  '${node.extension}'`).toEnd(assetsClassFile);
    shell.ShellString(`\npublic static Size: string =  '${node.size}'`).toEnd(assetsClassFile);
    shell.ShellString('\n}').toEnd(assetsClassFile);
  }
}

shell.ShellString('/* AUTO GENERATED FILE. DO NOT MODIFY !!! */\n\n').to(assetsClassFile);
tree.children.forEach(child => loopTree(child));

shell.exec(' tslint --fix src/assets.ts')
