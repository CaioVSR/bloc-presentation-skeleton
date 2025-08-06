export function generatePresentationEventTemplate(className: string, hasEquatable: boolean): string {
  if (hasEquatable) {
    return `import 'package:equatable/equatable.dart';

sealed class ${className}PresentationEvent extends Equatable {
  const ${className}PresentationEvent();

  @override
  List<Object?> get props => [];
}

class ShowLoadingEvent extends ${className}PresentationEvent {
  const ShowLoadingEvent();
}

class HideLoadingEvent extends ${className}PresentationEvent {
  const HideLoadingEvent();
}
`;
  } else {
    return `sealed class ${className}PresentationEvent {
  const ${className}PresentationEvent();
}

class ShowLoadingEvent extends ${className}PresentationEvent {
  const ShowLoadingEvent();
}

class HideLoadingEvent extends ${className}PresentationEvent {
  const HideLoadingEvent();
}
`;
  }
}