const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare(api => {
  api.assertVersion(7);

  return {
    name: 'function-counter-plugin',
    visitor: {
      Program: {
        enter(path) {
          path.unshiftContainer('body', api.template.statement(`
            if (typeof global.__FUNCTION_CALL_COUNTS__ === 'undefined') {
              global.__FUNCTION_CALL_COUNTS__ = new Map();
            }
          `)());
        },
        exit(path) {
          path.pushContainer('body', api.template.statement(`
            if (typeof afterAll === 'function') {
              afterAll(() => {
                console.log('Function call counts:');
                for (const [key, count] of global.__FUNCTION_CALL_COUNTS__) {
                  console.log(key + ': ' + count);
                }
              });
            }
          `)());
        }
      },
      Function(path) {
        if (path.node.type === 'ArrowFunctionExpression' && !path.node.body.body) {
          // Skip arrow functions with implicit returns
          return;
        }

        const functionName = path.node.id ? path.node.id.name : 'anonymous';
        const key = `${path.hub.file.opts.filename}:${functionName}:${path.node.start}:${path.node.end}`;

        const incrementStatement = api.template.statement(`
          if (global.__FUNCTION_CALL_COUNTS__) {
            const key = '${key}';
            global.__FUNCTION_CALL_COUNTS__.set(key, (global.__FUNCTION_CALL_COUNTS__.get(key) || 0) + 1);
          }
        `)();

        if (path.node.body.type === 'BlockStatement') {
          path.get('body').unshiftContainer('body', incrementStatement);
        } else {
          const newBody = api.types.blockStatement([
            incrementStatement,
            api.types.returnStatement(path.node.body)
          ]);
          path.node.body = newBody;
        }
      }
    }
  };
});