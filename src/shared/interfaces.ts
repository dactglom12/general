export interface Filter {
  stateField: string;
  render: (value, onChange) => JSX.Element;
  externalInitialState: any;
  internalInitialState: any;
  mapValueToString: (value: any) => string;
}

export interface WithOpenCloseState {
  isOpen: boolean;
  onClose: () => void;
}

export type FilterStateEntry = Record<string, any>;
