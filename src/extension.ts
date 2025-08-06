// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {handleGenerateStructure} from './services/command-handler';

/**
 * Main extension activation function
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bloc-presentation-skeleton" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('bloc-presentation-skeleton.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Bloc Presentation Skeleton!');
	});

	// Register the context menu command for generating cubit structure
	const generateCubitCommand = vscode.commands.registerCommand('bloc-presentation-skeleton.generateCubit', async (uri: vscode.Uri) => {
		await handleGenerateStructure(uri, 'cubit');
	});

	console.log('Commands registered successfully');
	context.subscriptions.push(disposable);
	context.subscriptions.push(generateCubitCommand);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() { }
