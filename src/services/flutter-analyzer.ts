import * as fs from 'fs';
import * as path from 'path';

/**
 * Flutter project analysis utilities
 */

export interface FlutterProjectInfo {
  importPath: string;
  hasEquatable: boolean;
  packageName?: string;
}

/**
 * Analyzes a Flutter project to extract package information and dependencies
 * @param folderPath - The folder path within the Flutter project
 * @param fileName - The file name to generate import path for
 * @returns Project information including import path and Equatable availability
 */
export function analyzeFlutterProject(folderPath: string, fileName: string): FlutterProjectInfo {
  try {
    // Find pubspec.yaml to get package name and project root
    let currentDir = folderPath;
    let pubspecPath = '';
    let packageName = '';
    let hasEquatable = false;

    // Search up the directory tree for pubspec.yaml
    while (currentDir !== path.dirname(currentDir)) {
      const testPubspecPath = path.join(currentDir, 'pubspec.yaml');
      if (fs.existsSync(testPubspecPath)) {
        pubspecPath = testPubspecPath;
        break;
      }
      currentDir = path.dirname(currentDir);
    }

    if (pubspecPath) {
      // Read pubspec.yaml to get package name and check dependencies
      const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
      const packageNameMatch = pubspecContent.match(/^name:\s*(.+)$/m);
      if (packageNameMatch) {
        packageName = packageNameMatch[1].trim();
      }

      // Check if equatable is in dependencies
      hasEquatable = pubspecContent.includes('equatable:');
    }

    let importPath = fileName; // fallback
    if (packageName) {
      // Calculate relative path from lib directory
      const projectRoot = path.dirname(pubspecPath);
      const libPath = path.join(projectRoot, 'lib');
      const relativePath = path.relative(libPath, folderPath);
      const fullPath = path.join(relativePath, fileName).replace(/\\/g, '/');

      importPath = `package:${packageName}/${fullPath}`;
    }

    return {importPath, hasEquatable, packageName};
  } catch (error) {
    console.error('Error analyzing Flutter project:', error);
  }

  // Fallback
  return {importPath: fileName, hasEquatable: false};
}
