import fs from "fs";
import path from "path";
import prettier from "prettier";
import types from "@babel/types";
import traverse from "@babel/traverse";
import parser from "@babel/parser";
import generator from "@babel/generator";
import child_process from "child_process";

export function clean({ target }) {
  fs.rmdirSync(path.join(process.cwd(), target), { recursive: true });
}

export function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      } else if (stdout) {
        console.log(stdout);
      } else {
        console.log(stderr);
      }
      resolve(stdout ? true : false);
    });
  });
}

export const read = path => {
  return fs.readFileSync(path, "utf8");
};

export const write = (path, data) => {
  return fs.writeFileSync(path, data);
}

export const pretty = code => {
  return prettier.format(
    code,
    {
      semi: false,
      parser: "babel",
      trailingComma: "none",
      arrowParens: "avoid"
    }
  );
};

export const generate = node => {
  return generator.default(node, {
    retainLines: true,
    compact: false
  }).code;
};

export const parse = code => {
  return parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "classProperties"]
  });
};

export class ManifestTransformer {
  constructor({ add, module }) {
    this.add = add;
    this.module = module;
    this.capitalizedModule = module.trim().replace(/^\w/, (c) => c.toUpperCase());
  }

  visit(node) {
    if (this.add) {
      traverse.default(node, {
        // Push array element
        ArrayExpression: path => {
          let elements = path.node.elements;
          elements.push(types.identifier(this.capitalizedModule));
          path.replaceWith(types.arrayExpression(elements));
          path.skip();
        }
      });
      // Push Import
      node.program.body = [
        types.importDeclaration(
          [
            types.importDefaultSpecifier(types.identifier(this.capitalizedModule))
          ],
          types.stringLiteral(`./${this.module}`)
        ),
        ...node.program.body
      ]
    } else {
      traverse.default(node, {
        // Filter array element
        ArrayExpression: path => {
          path.replaceWith(types.arrayExpression(
            path.node.elements.filter(ele => ele.name != this.capitalizedModule)
          ));
          path.skip();
        },
        // Filter import
        ImportDeclaration: path => {
          if (path.node.source.value == `./${this.module}`) {
            path.remove();
          };
        }
      });
    }
    return node;
  }
}
