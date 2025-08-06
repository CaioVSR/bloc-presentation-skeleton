import * as path from 'path';
import {generateStateTemplate} from '../templates/state-template';
import {generatePresentationEventTemplate} from '../templates/presentation-event-template';
import {generateCubitTemplate} from '../templates/cubit-template';
import {toSnakeCase} from '../utils/string-utils';
import {writeFile, ensureDirectoryExists} from '../utils/file-utils';
import {analyzeFlutterProject} from './flutter-analyzer';

/**
 * Code generation service for creating cubit/bloc structure files
 */

export interface GeneratedFiles {
  cubitFilePath: string;
  stateFilePath: string;
  presentationEventFilePath: string;
}

export interface CodeGenerationOptions {
  className: string;
  targetPath: string;
  type: 'cubit' | 'bloc';
}

/**
 * Generates the complete cubit/bloc structure with all necessary files
 * @param options - The generation options
 * @returns The paths of the generated files
 */
export function generateCodeStructure(options: CodeGenerationOptions): GeneratedFiles {
  const {className, targetPath, type} = options;

  // Ensure target directory exists
  ensureDirectoryExists(targetPath);

  // Convert className to snake_case for file names
  const snakeCaseName = toSnakeCase(className);

  // Define the file names
  const cubitFileName = `${snakeCaseName}_cubit.dart`;
  const presentationEventFileName = `${snakeCaseName}_presentation_event.dart`;
  const stateFileName = `${snakeCaseName}_state.dart`;

  // Create file paths
  const cubitFilePath = path.join(targetPath, cubitFileName);
  const presentationEventFilePath = path.join(targetPath, presentationEventFileName);
  const stateFilePath = path.join(targetPath, stateFileName);

  // Analyze Flutter project for import path and dependencies
  const projectInfo = analyzeFlutterProject(targetPath, presentationEventFileName);

  // Generate the file contents using templates
  const cubitContent = generateCubitTemplate(className, snakeCaseName, projectInfo.importPath, projectInfo.hasEquatable);
  const presentationEventContent = generatePresentationEventTemplate(className, projectInfo.hasEquatable);
  const stateContent = generateStateTemplate(className, snakeCaseName, projectInfo.hasEquatable);

  // Create the three files with proper content
  writeFile(cubitFilePath, cubitContent);
  writeFile(presentationEventFilePath, presentationEventContent);
  writeFile(stateFilePath, stateContent);

  return {
    cubitFilePath,
    stateFilePath,
    presentationEventFilePath
  };
}
