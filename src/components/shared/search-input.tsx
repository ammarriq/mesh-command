import SearchIcon from '@/icons/search-normal';

import { Input } from '../ui/input';

interface SearchInputProps {
  isChatTab?: boolean;
}

export function SearchInput({ isChatTab }: SearchInputProps) {
  return (
    <label
      className={`w-full px-3 py-1 items-center gap-2 rounded-xs bg-Bg-Dark shadow-xs ${
        isChatTab ? 'flex-1 flex' : 'w-72 lg:w-80 2xl:w-[360px] md:flex hidden'
      } `}
    >
      <span className="sr-only">Search</span>
      <SearchIcon className="size-5 sm:size-6 text-text-secondary" aria-hidden />
      <Input
        id={'search'}
        name={'search'}
        type={'text'}
        placeholder={'Search'}
        className="shadow-none border-none outline-none ring-0 p-0 text-sm placeholder:text-sm bg-transparent "
      />
    </label>
  );
}
