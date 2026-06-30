const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const provider = new ReiconWebviewViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ReiconWebviewViewProvider.viewType, provider)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('reicon.focusExplorer', () => {
            vscode.commands.executeCommand('workbench.view.extension.reicon-explorer');
        })
    );
}

class ReiconWebviewViewProvider {
    static viewType = 'reicon.views.explorer';

    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    /**
     * @param {vscode.WebviewView} webviewView
     * @param {vscode.WebviewViewResolveContext} context
     * @param {vscode.CancellationToken} _token
     */
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'insert-icon':
                    this._insertIcon(data.snippet, data.name);
                    break;
                case 'open-url':
                    vscode.env.openExternal(vscode.Uri.parse(data.url));
                    break;
                case 'show-toast':
                    vscode.window.showInformationMessage(data.message);
                    break;
            }
        });
    }

    /**
     * @param {string} snippet
     * @param {string} name
     */
    _insertIcon(snippet, name) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            // Fallback: Copy to clipboard if no editor is active
            vscode.env.clipboard.writeText(snippet);
            vscode.window.showInformationMessage(`No active editor. Copied "${name}" snippet to clipboard.`);
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, snippet);
        }).then(success => {
            if (success) {
                vscode.window.setStatusBarMessage(`Inserted Reicon "${name}"`, 3000);
            } else {
                vscode.window.showErrorMessage(`Failed to insert Reicon "${name}"`);
            }
        });
    }

    /**
     * @param {vscode.Webview} webview
     */
    _getHtmlForWebview(webview) {
        const htmlPath = path.join(this._extensionUri.fsPath, 'dist', 'ui.html');
        if (!fs.existsSync(htmlPath)) {
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Reicon Icons</title>
                    <style>
                        body {
                            font-family: sans-serif;
                            padding: 20px;
                            color: var(--vscode-editor-foreground, #cccccc);
                            background-color: var(--vscode-editor-background, #1e1e1e);
                        }
                    </style>
                </head>
                <body>
                    <h3>Reicon Webview file not found</h3>
                    <p>Please make sure you have run the build command inside the reicon-vscode directory.</p>
                </body>
                </html>
            `;
        }
        return fs.readFileSync(htmlPath, 'utf8');
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
