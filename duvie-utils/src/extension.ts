// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { url } from 'inspector';
// import fs,{ fstat } from 'fs';
import * as vscode from 'vscode';

import ComponentTemplate from './template/component';

import Config from './template/config';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const OpenCommandName = 'duvie-utils.open';

const TemplateCommand = 'duvie-utils.template';

const wsedit : vscode.WorkspaceEdit = new vscode.WorkspaceEdit();

const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

let extensionConfig : object | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {

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

	extensionConfig = undefined; // clear config

	/** @register  */
	register(context);



}



async function config(context: vscode.ExtensionContext) {

	debugger;

	const default_config_path = "/extension-config/config.json";
	if (FileExists(default_config_path)) {
		vscode.window.showInformationMessage("Use project default config");
		var a = GetFile(default_config_path);

		try{
			extensionConfig = JSON.parse(a.toLocaleString());
			console.log(extensionConfig)
		}catch(e){
			vscode.window.showErrorMessage("error");
		}

	}else{
		vscode.window.showInformationMessage("Default config not exists");
		vscode.window.showQuickPick(["Create config file", "Exit"]).then((value : any) => {
			if(value == "Create config file"){
				CreateFile(default_config_path, Config);
				
			}
		});
	}
}


type TOptions = 'component' | 'serivce' | 'module' | 'other' | 'permission';

const options_list: TOptions[] = ["component", "module", "serivce", "other", "permission"];

async function GetPath() {
	return await vscode.window.showInputBox(
		{
			prompt: "Full path ??",
			placeHolder: "component/index.tsx",
			value: ''
		}
	)
}

async function GetFile(path: string){
	return vscode.workspace.fs.readFile(vscode.Uri.parse(wsPath + path));
}

async function FileExists(path: string) {
	console.log(path);
	return wsedit.has(vscode.Uri.parse(wsPath + path!))
}

async function CreateFile(path: string, Content: string) {
	

	if (FileExists(path)) {
		vscode.window.showInformationMessage('File exists');
		return false;
	} else {
		console.log(wsPath);

		const filePath = vscode.Uri.file(wsPath + path);

		wsedit.createFile(filePath, { ignoreIfExists: true });
		wsedit.insert(filePath, new vscode.Position(0, 0), Content);
		vscode.workspace.applyEdit(wsedit);
	}
}

async function register(context: vscode.ExtensionContext) {

	
	let OpenCommand = vscode.commands.registerCommand(OpenCommandName, async () => {

		if(vscode.workspace.workspaceFolders == undefined){
			vscode.window.showErrorMessage("No workspace're open, open one and try again");
			return;
		}

		config(context);

		if(extensionConfig == undefined)
			return;


		// var file_name = await vscode.window.showInputBox(
		// 	{ prompt: 'Điền tên file định tạo', placeHolder: 'ví dụ : lead.insert.tsx', value: '' }
		// );

		// var folder = await vscode.window.showInputBox(
		// 	{ prompt: 'Điền tên folder định tạo', placeHolder: 'ví dụ : lead/detail', value: '' }
		// );

		var choose = await vscode.window.showQuickPick(options_list).then(async (vl: any) => {

			var path = await GetPath();

			/** @component */
			if (vl == options_list[0]) {
				CreateFile(path!, "a");
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
		});

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


	})

	context.subscriptions.push(OpenCommand);

	let template = vscode.commands.registerCommand(TemplateCommand, () => {
		var file_content = vscode.workspace.fs.readFile(vscode.Uri.parse('/src/template/service.txt'));
		console.log(file_content);
	});

	context.subscriptions.push(template);

}

// this method is called when your extension is deactivated
export function deactivate() { }
