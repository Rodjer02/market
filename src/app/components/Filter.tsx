interface FilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  types,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="filter" className="block text-lg font-medium mb-2">
        Фильтр по типу
      </label>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      >
        <option value="">Все</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
