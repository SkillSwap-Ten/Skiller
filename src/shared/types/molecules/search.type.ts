export interface ISearchProps {
  label: string;
  placeholder: string;
  onSearch: (query: string) => void;
  onTogglePartialSearch?: () => void;
  isPartialSearch?: boolean;
}