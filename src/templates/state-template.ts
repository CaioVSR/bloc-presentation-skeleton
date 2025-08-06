export function generateStateTemplate(className: string, snakeCaseName: string, hasEquatable: boolean): string {
  if (hasEquatable) {
    return `part of '${snakeCaseName}_cubit.dart';

class ${className}State extends Equatable {
  const ${className}State();

  factory ${className}State.initial() => ${className}State();

  ${className}State copyWith() => ${className}State();

  @override
  List<Object> get props => [];
}
`;
  } else {
    return `part of '${snakeCaseName}_cubit.dart';

class ${className}State {
  const ${className}State();

  factory ${className}State.initial() => ${className}State();

  ${className}State copyWith() => ${className}State();
}
`;
  }
}