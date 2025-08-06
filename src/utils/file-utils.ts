import * as fs from 'fs';
import * as path from 'path';

/**
 * File system utility functions for project structure management
 */

export interface FolderAnalysis {
  targetPath: string;
  folderType: 'cubit' | 'bloc' | null;
}

/**
 * Determines the target folder and whether it's already a cubit/bloc folder
 * @param folderPath - The path to analyze
 * @returns Analysis result with target path and folder type
 */
export function determineTargetFolder(folderPath: string): FolderAnalysis {
  const folderName = path.basename(folderPath);

  // If already in cubit or bloc folder, use it directly
  if (folderName === 'cubit') {
    return {targetPath: folderPath, folderType: 'cubit'};
  }
  if (folderName === 'bloc') {
    return {targetPath: folderPath, folderType: 'bloc'};
  }

  // If not in cubit/bloc folder, we need to create one
  return {targetPath: folderPath, folderType: null};
}

/**
 * Creates a directory if it doesn't exist
 * @param dirPath - The directory path to create
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
  }
}

/**
 * Writes content to a file
 * @param filePath - The file path to write to
 * @param content - The content to write
 */
export function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content);
}
