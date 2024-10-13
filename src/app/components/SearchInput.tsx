import { FaSearch } from "react-icons/fa";

function SearchInput({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (string: string) => void;
}) {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block text-lg font-medium mb-2">
        Поиск товаров
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
      </div>
    </div>
  );
}

export default SearchInput;
