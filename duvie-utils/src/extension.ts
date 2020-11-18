// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { url } from 'inspector';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const OpenCommandName = 'duvie-utils.open';

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

	/** @register  */
	register(context);

}


async function register(context : vscode.ExtensionContext){
	let OpenCommand = vscode.commands.registerCommand(OpenCommandName, async () => {
		var file_name = await vscode.window.showInputBox(
			{ prompt: 'Điền tên file định tạo', placeHolder: 'ví dụ : lead.insert.tsx', value: '' }
		);

		var folder = await vscode.window.showInputBox(
			{ prompt: 'Điền tên folder định tạo', placeHolder: 'ví dụ : lead/detail', value: '' }
		);

		if(file_name == '' || (file_name == '' && folder == ''))
		{
			vscode.window.showErrorMessage('Empty');
			return;
		}

		let path = folder == '' ? file_name : folder + "\\" + file_name;

		console.log(vscode.workspace.getConfiguration)

		console.log(vscode.workspace.workspaceFile);

		const wsedit = new vscode.WorkspaceEdit();

		if(wsedit.has(vscode.Uri.parse(path!))){
			vscode.window.showInformationMessage('File exists');
		}else{

			let file_uri = vscode.Uri.parse(path!);

			vscode.window.showInformationMessage('File not exists');

			const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder
			const filePath = vscode.Uri.file(wsPath + '/hello/world.md');				

			// wsedit.createFile(file_uri);
			// wsedit.insert(file_uri, new vscode.Position(0,0), "hehehehehe");
			wsedit.createFile(filePath, { ignoreIfExists: true });
			wsedit.insert(filePath, new vscode.Position(0,0), "fuck you bitch");
			vscode.workspace.applyEdit(wsedit);
			
		}

		// const data = new Uint8Array(Buffer.from('Hello Node.js'));

		// vscode.workspace.fs.writeFile(vscode.Uri.parse(path!), data);

		// if(vscode.workspace.fs.stat(vscode.Uri.parse(path!))){
		// 	vscode.window.showInformationMessage('File exists');
		// }else{

		// 	const data = new Uint8Array(Buffer.from('Hello Node.js'));

		// 	vscode.workspace.fs.writeFile(vscode.Uri.parse(path!), data);
		// }
		

	})
}

// this method is called when your extension is deactivated
export function deactivate() {}
