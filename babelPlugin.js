const path = require('path');

const functionCounterPlugin = ({ types: t }) => ({
    name: "function-counter",
    visitor: {
      Function(nodePath, state) {
        const filePath = state.file.opts.filename;
        if (!filePath.includes(`${path.sep}src${path.sep}`) ||
        filePath.includes(`${path.sep}node_modules${path.sep}`)) {
          return;
        }

        const functionName = nodePath.node.id ? nodePath.node.id.name : 'anonymous';
        
        const isLikelyUserDefined = () => {
          if (functionName.startsWith('_')) {
            return false;
          }
          
          if (nodePath.parentPath.isExportNamedDeclaration() || nodePath.parentPath.isExportDefaultDeclaration()) {
            return true;
          }
          
          if (nodePath.parentPath.isClassMethod() || nodePath.parentPath.isObjectMethod()) {
            return true;
          }
          
          if (nodePath.parentPath.isVariableDeclarator() || nodePath.parentPath.isAssignmentExpression()) {
            return true;
          }
          
          if (functionName === 'anonymous' && !nodePath.parentPath.isCallExpression()) {
            return true;
          }
          
          if (functionName !== 'anonymous') {
            return true;
          }
          
          return false;
        };

        if (!isLikelyUserDefined()) {
          return;
        }

        const key = nodePath.node.id ? functionName : `${functionName}_${nodePath.node.start}_${nodePath.node.end}`;
        
        // Create the counter increment statement
        const counterIncrementStatement = t.tryStatement(
            t.blockStatement([
              t.expressionStatement(
                t.assignmentExpression(
                  "=",
                  t.memberExpression(t.identifier("global"), t.identifier("functionInvocationCount")),
                  t.logicalExpression(
                    "||",
                    t.memberExpression(t.identifier("global"), t.identifier("functionInvocationCount")),
                    t.objectExpression([])
                  )
                )
              ),
              t.expressionStatement(
                t.assignmentExpression(
                  "=",
                  t.memberExpression(
                    t.memberExpression(t.identifier("global"), t.identifier("functionInvocationCount")),
                    t.stringLiteral(key),
                    true
                  ),
                  t.binaryExpression(
                    "+",
                    t.logicalExpression(
                      "||",
                      t.memberExpression(
                        t.memberExpression(t.identifier("global"), t.identifier("functionInvocationCount")),
                        t.stringLiteral(key),
                        true
                      ),
                      t.numericLiteral(0)
                    ),
                    t.numericLiteral(1)
                  )
                )
              )
            ]),
            t.catchClause(
              t.identifier("e"),
              t.blockStatement([
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(t.identifier("console"), t.identifier("warn")),
                    [t.stringLiteral("Error in function instrumentation:"), t.identifier("e")]
                  )
                )
              ])
            )
          );

        // If the function body is a BlockStatement, prepend our counter
        if (t.isBlockStatement(nodePath.node.body)) {
          nodePath.node.body.body.unshift(counterIncrementStatement);
        } else {
          // If it's not a BlockStatement (e.g., arrow function with implicit return),
          // wrap the body in a BlockStatement
          nodePath.node.body = t.blockStatement([
            counterIncrementStatement,
            t.returnStatement(nodePath.node.body)
          ]);
        }

        console.log(`Instrumenting function ${functionName} in ${filePath}`);
      },
      Program: {
        enter(path, state) {
          const filePath = state.file.opts.filename;
          if (filePath.includes(`${path.sep  }src${  path.sep}`)) {
            path.unshiftContainer('body', t.expressionStatement(
              t.assignmentExpression(
                "=",
                t.memberExpression(
                  t.identifier("global"),
                  t.identifier("functionInvocationCount")
                ),
                t.logicalExpression(
                  "||",
                  t.memberExpression(
                    t.identifier("global"),
                    t.identifier("functionInvocationCount")
                  ),
                  t.objectExpression([])
                )
              )
            ));
          }
        }
      }
    }
  });

module.exports = functionCounterPlugin;