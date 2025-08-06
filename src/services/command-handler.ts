import * as vscode from 'vscode';
import * as path from 'path';
import {determineTargetFolder} from '../utils/file-utils';
import {generateCodeStructure} from './code-generator';

/**
 * Command handler service for VS Code extension commands
 */

/**
 * Handles the generation of cubit/bloc structure
 * @param uri - The URI of the selected folder
 * @param type - The type of structure to generate ('cubit' or 'bloc')
 */
export async function handleGenerateStructure(uri: vscode.Uri, type: 'cubit' | 'bloc'): Promise<void> {
  try {
    // Get the folder path
    const folderPath = uri.fsPath;

    // Determine target folder and whether we need to create a subfolder
    const {targetPath, folderType} = determineTargetFolder(folderPath);
    let finalTargetPath = targetPath;
    let chosenFolderType = folderType;

    // If not in cubit/bloc folder, we'll create the specified type folder after getting class name
    if (!folderType) {
      chosenFolderType = type;
      finalTargetPath = path.join(targetPath, type);
    }

    // Prompt user for the class name with specific type in prompt
    const className = await vscode.window.showInputBox({
      prompt: `Enter the class name for your ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeHolder: 'e.g., Counter, User, Auth',
      validateInput: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Class name cannot be empty';
        }
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value.trim())) {
          return 'Class name must start with uppercase letter and contain only letters and numbers';
        }
        return null;
      }
    });

    // If user cancelled the input or provided empty name
    if (!className) {
      vscode.window.showWarningMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} generation cancelled: No class name provided`);
      return;
    }

    // Generate the code structure
    const generatedFiles = generateCodeStructure({
      className,
      targetPath: finalTargetPath,
      type
    });

    // Show success message
    vscode.window.showInformationMessage(`✅ Created ${className} ${chosenFolderType} files successfully!`);

    console.log('Files created successfully:', {
      ...generatedFiles,
      folderType: chosenFolderType
    });

  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create files: ${error}`);
    console.error('Error creating files:', error);
  }
}
