import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchStore } from "~/stores/search.store";

import s from "./search.module.scss";
import debounce from "debounce";

export const Search = () => {
  const debounceSearch =
    useRef<debounce.DebouncedFunction<(searchTerm: string) => void>>(null);
  const searchValue = useSearchStore((store) => store.search);
  const searchBy = useSearchStore((store) => store.searchBy);

  const [search, setSearch] = useState(searchValue);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!debounceSearch.current) return;

    debounceSearch.current.clear();
    debounceSearch.current(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    searchBy(search);
  };

  useEffect(() => {
    debounceSearch.current = debounce((searchTerm: string) => {
      searchBy(searchTerm);
    }, 300);
  }, []);

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar Ativo ou Local"
      />
      <button className={s.button} type="submit">
        <AiOutlineSearch />
      </button>
    </form>
  );
};
