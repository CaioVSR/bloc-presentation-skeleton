/**
 * String utility functions for code generation
 */

/**
 * Converts PascalCase strings to snake_case for Dart file naming conventions
 * @param pascalCase - The PascalCase string to convert
 * @returns The snake_case equivalent
 * @example toSnakeCase('UserProfile') => 'user_profile'
 */
export function toSnakeCase(pascalCase: string): string {
  return pascalCase
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .substring(1); // Remove leading underscore
}
