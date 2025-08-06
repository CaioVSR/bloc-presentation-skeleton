export function generateCubitTemplate(className: string, snakeCaseName: string, presentationEventImport: string, hasEquatable: boolean): string {
  const equatableImport = hasEquatable ? "import 'package:equatable/equatable.dart';\n" : "";

  return `import 'package:bloc_presentation/bloc_presentation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
${equatableImport}import '${presentationEventImport}';

part '${snakeCaseName}_state.dart';

class ${className}Cubit extends Cubit<${className}State> with BlocPresentationMixin<${className}State, ${className}PresentationEvent> {
  ${className}Cubit() : super(${className}State.initial());
}
`;
}
