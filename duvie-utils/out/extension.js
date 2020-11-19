"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { url } from 'inspector';
const vscode = require("vscode");
const component_1 = require("./template/component");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const OpenCommandName = 'duvie-utils.open';
const TemplateCommand = 'duvie-utils.template';
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "duvie-utils" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('duvie-utils.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from duvie-utils!');
    });
    context.subscriptions.push(disposable);
    /** @register  */
    register(context);
}
exports.activate = activate;
const options_list = ["component", "module", "serivce", "other"];
function GetPath() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vscode.window.showInputBox({
            prompt: "Full path ??",
            placeHolder: "component/index.tsx",
            value: ''
        });
    });
}
function CreateFile(path, templatePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const wsedit = new vscode.WorkspaceEdit();
        if (wsedit.has(vscode.Uri.parse(path))) {
            vscode.window.showInformationMessage('File exists');
            return false;
        }
        else {
            const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
            const filePath = vscode.Uri.file(wsPath + path);
            wsedit.createFile(filePath, { ignoreIfExists: true });
            wsedit.insert(filePath, new vscode.Position(0, 0), component_1.default);
            vscode.workspace.applyEdit(wsedit);
        }
    });
}
function register(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let OpenCommand = vscode.commands.registerCommand(OpenCommandName, () => __awaiter(this, void 0, void 0, function* () {
            // var file_name = await vscode.window.showInputBox(
            // 	{ prompt: 'Điền tên file định tạo', placeHolder: 'ví dụ : lead.insert.tsx', value: '' }
            // );
            // var folder = await vscode.window.showInputBox(
            // 	{ prompt: 'Điền tên folder định tạo', placeHolder: 'ví dụ : lead/detail', value: '' }
            // );
            var choose = yield vscode.window.showQuickPick(options_list).then((vl) => __awaiter(this, void 0, void 0, function* () {
                var path = yield GetPath();
                /** @component */
                if (vl == options_list[0]) {
                    CreateFile(path, "a");
                }
                /** @serivce */
                if (vl == options_list[1]) {
                }
                /** @module */
                if (vl == options_list[2]) {
                }
                /** @other */
                if (vl == options_list[3]) {
                }
            }));
            return;
            // if (file_name == '' || (file_name == '' && folder == '')) {
            // 	vscode.window.showErrorMessage('Empty');
            // 	return;
            // }
            // let path = folder == '' ? file_name : folder + "\\" + file_name;
            // console.log(vscode.workspace.getConfiguration)
            // console.log(vscode.workspace.workspaceFile);
            // const wsedit = new vscode.WorkspaceEdit();
            // if (wsedit.has(vscode.Uri.parse(path!))) {
            // 	vscode.window.showInformationMessage('File exists');
            // } else {
            // 	let file_uri = vscode.Uri.parse(path!);
            // 	vscode.window.showInformationMessage('File not exists');
            // 	const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
            // 	const filePath = vscode.Uri.file(wsPath + '/hello/world.md');
            // 	// wsedit.createFile(file_uri);
            // 	// wsedit.insert(file_uri, new vscode.Position(0,0), "hehehehehe");
            // 	wsedit.createFile(filePath, { ignoreIfExists: true });
            // 	wsedit.insert(filePath, new vscode.Position(0, 0), "fuck you bitch");
            // 	vscode.workspace.applyEdit(wsedit);
            // }
            // const data = new Uint8Array(Buffer.from('Hello Node.js'));
            // vscode.workspace.fs.writeFile(vscode.Uri.parse(path!), data);
            // if(vscode.workspace.fs.stat(vscode.Uri.parse(path!))){
            // 	vscode.window.showInformationMessage('File exists');
            // }else{
            // 	const data = new Uint8Array(Buffer.from('Hello Node.js'));
            // 	vscode.workspace.fs.writeFile(vscode.Uri.parse(path!), data);
            // }
        }));
        context.subscriptions.push(OpenCommand);
        let template = vscode.commands.registerCommand(TemplateCommand, () => {
            var file_content = vscode.workspace.fs.readFile(vscode.Uri.parse('/src/template/service.txt'));
            console.log(file_content);
        });
        context.subscriptions.push(template);
    });
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map