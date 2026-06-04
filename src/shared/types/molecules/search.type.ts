export interface ISearchProps {
  label: string | React.ReactNode;
  placeholder: string;
  onSearch: (query: string) => void;
  onTogglePartialSearch?: () => void;
  isPartialSearch?: boolean;
}